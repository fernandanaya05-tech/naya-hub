import { mergeProjects } from './useProjects'

describe('mergeProjects', () => {
  it('keeps the newest project when ids overlap', () => {
    const localProjects = [{ id: '1', createdAt: '2024-01-01T00:00:00.000Z', title: 'Local' }]
    const remoteProjects = [{ id: '1', createdAt: '2024-01-02T00:00:00.000Z', title: 'Remote' }]

    const merged = mergeProjects(localProjects, remoteProjects)

    expect(merged).toHaveLength(1)
    expect(merged[0].title).toBe('Remote')
  })
})
