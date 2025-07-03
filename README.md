# Endpoints disponibles

## Routes CRUD
- `POST /todos` - Créer un nouveau todo
- `GET /todos` - Récupérer tous les todos
- `GET /todos?status=completed` - Récupérer les todos terminés
- `GET /todos?status=pending` - Récupérer les todos en attente
- `GET /todos/:id` - Récupérer un todo par ID
- `PATCH /todos/:id` - Mettre à jour un todo
- `DELETE /todos/:id` - Supprimer un todo

## Routes supplémentaires
- `GET /todos/stats` - Obtenir les statistiques

# Exemples d'utilisation

## Créer un todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Apprendre NestJS",
    "description": "Suivre le tutoriel complet"
  }'
```

## Récupérer tous les todos
```bash
curl http://localhost:3000/todos
```

## Mettre à jour un todo
```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

## Supprimer un todo
```bash
curl -X DELETE http://localhost:3000/todos/1
```

# Démarrage du projet
```bash
npm run start:dev
```

L'API sera disponible sur http://localhost:3000