const { createClient } = require('@supabase/supabase-js')

function toRemoteProject(project) {
  return {
    id: project.id,
    created_at: project.createdAt || new Date().toISOString(),
    title: project.title,
    description: project.description || '',
    service: project.service || '',
    checklist: project.checklist || [],
    packageName: project.packageName || '',
    packageDetail: project.packageDetail || ''
  }
}

function fromRemoteProject(item) {
  return {
    ...item,
    id: item.id,
    createdAt: item.created_at,
    title: item.title,
    description: item.description,
    service: item.service,
    checklist: item.checklist || [],
    packageName: item.packageName,
    packageDetail: item.packageDetail
  }
}

module.exports = async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Missing Supabase server env vars' })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json((data || []).map(fromRemoteProject))
  }

  if (req.method === 'POST') {
    let body = req.body

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        body = []
      }
    }

    const projects = Array.isArray(body) ? body : []
    const rows = projects.map(toRemoteProject)

    const { data, error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data || [])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
