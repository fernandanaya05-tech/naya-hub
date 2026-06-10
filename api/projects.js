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

async function githubRequest(path, options = {}) {
  const githubToken = process.env.GH_TOKEN
  const githubRepo = process.env.GH_REPO || 'fernandanaya05-tech/naya-hub'

  if (!githubToken || !githubRepo) {
    throw new Error('Missing GitHub sync credentials')
  }

  const response = await fetch(`https://api.github.com/${path.replace(/^\//, '')}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  })

  const text = await response.text()
  let payload = null

  try {
    payload = text ? JSON.parse(text) : null
  } catch {
    payload = text
  }

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && payload.message
      ? payload.message
      : 'GitHub request failed'
    throw new Error(`GitHub request failed (${response.status}): ${message}`)
  }

  return payload
}

async function readProjectsFromGitHub() {
  const projectsPath = process.env.GH_PROJECTS_FILE || 'data/projects.json'

  try {
    const file = await githubRequest(`/repos/${process.env.GH_REPO || 'fernandanaya05-tech/naya-hub'}/contents/${projectsPath}`)
    const content = Buffer.from(file.content, 'base64').toString('utf8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed.map(fromRemoteProject) : []
  } catch (error) {
    if (String(error.message).includes('404') || String(error.message).includes('Not Found')) return []
    throw error
  }
}

async function writeProjectsToGitHub(projects) {
  const projectsPath = process.env.GH_PROJECTS_FILE || 'data/projects.json'
  const repo = process.env.GH_REPO || 'fernandanaya05-tech/naya-hub'
  const rows = projects.map(toRemoteProject)

  let existing = null

  try {
    existing = await githubRequest(`/repos/${repo}/contents/${projectsPath}`)
  } catch (error) {
    if (!String(error.message).includes('404') && !String(error.message).includes('Not Found')) {
      throw error
    }
  }

  const content = Buffer.from(JSON.stringify(rows, null, 2) + '\n').toString('base64')
  const payload = {
    message: 'chore: sync naya hub projects',
    content,
    ...(existing?.sha ? { sha: existing.sha } : {})
  }

  await githubRequest(`/repos/${repo}/contents/${projectsPath}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  return rows
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const projects = await readProjectsFromGitHub()
      return res.status(200).json(projects)
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
      const rows = await writeProjectsToGitHub(projects)
      return res.status(200).json(rows)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
