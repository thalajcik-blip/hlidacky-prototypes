module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  var supabaseUrl = process.env.SUPABASE_URL;
  var serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  var tableName = process.env.SUPABASE_STRINGS_TABLE || 'prototype_strings';

  if (!supabaseUrl || !serviceRoleKey) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'Strings service is not configured yet.' }));
    return;
  }

  if (req.method === 'GET') {
    return handleGet(req, res, supabaseUrl, serviceRoleKey, tableName);
  }

  if (req.method === 'POST') {
    return handlePost(req, res, supabaseUrl, serviceRoleKey, tableName);
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method not allowed.' }));
};

async function handleGet(req, res, supabaseUrl, serviceRoleKey, tableName) {
  var prototypeKey = normalizePrototypeKey(req.query && req.query.prototype);
  var language = normalizeLanguage(req.query && req.query.language);

  if (!prototypeKey) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing prototype query parameter.' }));
    return;
  }

  try {
    var query = [
      'prototype_key=eq.' + encodeURIComponent(prototypeKey),
      'select=' + encodeURIComponent('prototype_key,language,payload,touched_keys,updated_at')
    ];

    if (language) {
      query.push('language=eq.' + encodeURIComponent(language));
    }

    query.push('order=' + encodeURIComponent('language.asc'));

    var response = await fetch(
      supabaseUrl.replace(/\/$/, '') + '/rest/v1/' + encodeURIComponent(tableName) + '?' + query.join('&'),
      {
        method: 'GET',
        headers: {
          apikey: serviceRoleKey,
          Authorization: 'Bearer ' + serviceRoleKey
        }
      }
    );

    if (!response.ok) {
      var errorText = await response.text();
      res.statusCode = 502;
      res.end(JSON.stringify({
        error: 'Strings could not be loaded.',
        details: errorText
      }));
      return;
    }

    var items = await response.json();
    res.statusCode = 200;
    res.end(JSON.stringify({
      ok: true,
      prototype_key: prototypeKey,
      items: Array.isArray(items) ? items : []
    }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Unexpected strings load error.',
      details: error && error.message ? error.message : String(error)
    }));
  }
}

async function handlePost(req, res, supabaseUrl, serviceRoleKey, tableName) {
  try {
    var body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    var prototypeKey = normalizePrototypeKey(body.prototype_key);
    var language = normalizeLanguage(body.language);
    var payload = body.payload && typeof body.payload === 'object' && !Array.isArray(body.payload) ? body.payload : null;
    var touchedKeys = Array.isArray(body.touched_keys)
      ? body.touched_keys.map(function(key) { return String(key); })
      : [];

    if (!prototypeKey) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'prototype_key is required.' }));
      return;
    }

    if (!language) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'language is required.' }));
      return;
    }

    if (!payload) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'payload must be a JSON object.' }));
      return;
    }

    var record = {
      prototype_key: prototypeKey,
      language: language,
      payload: payload,
      touched_keys: touchedKeys,
      updated_at: new Date().toISOString()
    };

    var response = await fetch(
      supabaseUrl.replace(/\/$/, '') + '/rest/v1/' + encodeURIComponent(tableName) +
      '?on_conflict=' + encodeURIComponent('prototype_key,language'),
      {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: 'Bearer ' + serviceRoleKey,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify(record)
      }
    );

    if (!response.ok) {
      var errorText = await response.text();
      res.statusCode = 502;
      res.end(JSON.stringify({
        error: 'Strings could not be stored.',
        details: errorText
      }));
      return;
    }

    var items = await response.json();
    res.statusCode = 200;
    res.end(JSON.stringify({
      ok: true,
      item: Array.isArray(items) ? items[0] : items
    }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Unexpected strings save error.',
      details: error && error.message ? error.message : String(error)
    }));
  }
}

function normalizePrototypeKey(value) {
  if (!value) return '';
  return String(value).trim();
}

function normalizeLanguage(value) {
  if (!value) return '';
  return String(value).trim().toUpperCase();
}
