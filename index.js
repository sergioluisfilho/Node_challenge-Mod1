const express = require('express')

const server = express()

server.use(express.json())

projects = []

function checkProjectExists(req, res, next) {
    const {id} = req.params
    const project = projects.find(p => p.id === id)

    if(!project) {
        return res.send('Project Not Found')
    }

    return next()
}

function logRequest(req, res, next) {
    console.count("Número de requisições")
    return next()
}

server.use(logRequest)

server.post('/projects', (req, res) =>{
    const {id, title} = req.body
    const project = {
        id,
        title,
        tasks: []
    }
    projects.push(project)

    return res.send(`Projeto ${project.title} adicionado com sucesso`)
})

server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const {id} = req.params
    const {title} = req.body

    const project = projects.find(p => p.id === id)
    
    project.title = title

    return res.send(`Projeto ${project.title} alterado`)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const {id} = req.params
    projects.splice(projects[id], 1)

    return res.send('Projeto deletado')
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const id = req.params.id
    const {title} = req.body

    const project = projects.find(p => p.id === id)

    project.tasks.push(title)

    return res.json(projects)
})

server.listen(3333)