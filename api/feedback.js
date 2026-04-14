module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  var supabaseUrl = process.env.SUPABASE_URL;
  var serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  var tableName = process.env.SUPABASE_FEEDBACK_TABLE || 'prototype_feedback';

  if (!supabaseUrl || !serviceRoleKey) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'Feedback service is not configured yet.' }));
    return;
  }

  try {
    var body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    var feedbackText = body.feedback_text ? String(body.feedback_text).trim() : '';

    if (!feedbackText) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Feedback text is required.' }));
      return;
    }

    var payload = {
      prototype_key: body.prototype_key || 'jobs-for-sitters',
      prototype_name: body.prototype_name || '',
      prototype_path: body.prototype_path || '',
      language: body.language || '',
      active_tab: body.active_tab || '',
      contact_name: body.contact_name ? String(body.contact_name).trim() : '',
      contact_email: body.contact_email ? String(body.contact_email).trim() : '',
      feedback_text: feedbackText,
      page_url: body.page_url || '',
      submitted_from: body.submitted_from || '',
      user_agent: req.headers['user-agent'] || body.user_agent || '',
      context: body.context && typeof body.context === 'object' ? body.context : {}
    };

    var response = await fetch(
      supabaseUrl.replace(/\/$/, '') + '/rest/v1/' + encodeURIComponent(tableName),
      {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: 'Bearer ' + serviceRoleKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      var errorText = await response.text();
      res.statusCode = 502;
      res.end(JSON.stringify({
        error: 'Feedback could not be stored.',
        details: errorText
      }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Unexpected feedback submission error.',
      details: error && error.message ? error.message : String(error)
    }));
  }
};
