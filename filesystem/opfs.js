const root = await navigator.storage.getDirectory()
let project = null

async function resolve(path) {
    if (!project) throw new Error('no project selected');
    if (!path) return project

    const parts = path.split('/').filter(Boolean)
    let current = project

    for (const part of parts.slice(0, -1)) {
        current = await current.getDirectoryHandle(part, { create: true })
    }

    return { parent: current, name: parts.at(-1) }
}

export async function getProject(name) {
    project = await root.getDirectoryHandle(name, { create: true });
    return project;
}

export async function getDir(path) {
    const { parent, name } = await resolve(path)
    try {
        return await parent.getDirectoryHandle(name)
    } catch (e) {
        if (e.name === 'NotFoundError') return false
        throw e
    }
}

export async function writeFile(path, data) {
    const { parent, name } = await resolve(path)
    const handle = await parent.getFileHandle(name, { create: true })
    const writable = await handle.createWritable()
    await writable.write(data)
    await writable.close()
}

export async function readFile(path) {
    const { parent, name } = await resolve(path)
    const handle = await parent.getFileHandle(name)
    return handle.getFile()
}