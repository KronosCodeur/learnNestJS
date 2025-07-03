import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API NestJS - Bienvenue</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'nest-red': '#E0234E',
                        'nest-dark': '#0F172A',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <div class="flex justify-center items-center mb-6">
                <div class="bg-nest-red rounded-full p-4 shadow-lg">
                    <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                </div>
            </div>
            <h1 class="text-5xl font-bold text-white mb-4">
                Bienvenue sur l'API
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                    NestJS
                </span>
            </h1>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                Une API moderne et robuste construite avec NestJS, TypeScript et les meilleures pratiques de développement
            </p>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-8 mb-12">
            <!-- Description Card -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div class="flex items-center mb-6">
                    <div class="bg-blue-500 rounded-lg p-3 mr-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">À propos de l'API</h2>
                </div>
                <p class="text-gray-300 leading-relaxed mb-4">
                    Cette API REST a été développée avec NestJS, un framework Node.js progressif qui utilise TypeScript par défaut. 
                    Elle offre une architecture modulaire, scalable et maintenant un haut niveau de performance.
                </p>
                <ul class="text-gray-300 space-y-2">
                    <li class="flex items-center">
                        <span class="text-green-400 mr-2">✓</span>
                        Architecture modulaire et testable
                    </li>
                    <li class="flex items-center">
                        <span class="text-green-400 mr-2">✓</span>
                        TypeScript pour une meilleure qualité de code
                    </li>
                    <li class="flex items-center">
                        <span class="text-green-400 mr-2">✓</span>
                        Validation automatique des données
                    </li>
                    <li class="flex items-center">
                        <span class="text-green-400 mr-2">✓</span>
                        Documentation OpenAPI intégrée
                    </li>
                </ul>
            </div>

            <!-- Quick Links Card -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div class="flex items-center mb-6">
                    <div class="bg-purple-500 rounded-lg p-3 mr-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Liens rapides</h2>
                </div>
                <div class="space-y-4">
                    <a href="/api" class="block bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-bold text-lg">📚 Documentation Swagger</h3>
                                <p class="text-blue-100">Interface interactive de l'API</p>
                            </div>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </a>
                    <div class="bg-gray-800/50 rounded-lg p-4">
                        <h3 class="font-bold text-white mb-2">🚀 Endpoints disponibles</h3>
                        <p class="text-gray-300 text-sm">
                            Consultez la documentation Swagger pour découvrir tous les endpoints disponibles et tester l'API directement dans votre navigateur.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 mb-12">
            <h2 class="text-3xl font-bold text-white mb-8 text-center">Fonctionnalités</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Fiable & Sécurisé</h3>
                    <p class="text-gray-300">
                        Validation des données, gestion d'erreurs robuste et sécurité intégrée
                    </p>
                </div>
                <div class="text-center">
                    <div class="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Performant</h3>
                    <p class="text-gray-300">
                        Optimisé pour la performance avec un temps de réponse minimal
                    </p>
                </div>
                <div class="text-center">
                    <div class="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Facile à utiliser</h3>
                    <p class="text-gray-300">
                        Interface intuitive et documentation complète pour les développeurs
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center text-gray-400">
            <p class="mb-2">
                Développé avec ❤️ en utilisant 
                <span class="text-nest-red font-semibold">NestJS</span>, 
                <span class="text-blue-400 font-semibold">TypeScript</span> et 
                <span class="text-cyan-400 font-semibold">Tailwind CSS</span>
            </p>
            <p class="text-sm">
                Version 1.0.0 • Environnement: ${process.env.NODE_ENV || 'development'}
            </p>
        </div>
    </div>

    <!-- Floating particles animation -->
    <div class="fixed inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse animation-delay-500"></div>
        <div class="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
        <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-20 animate-pulse animation-delay-1500"></div>
    </div>
</body>
</html>`;
  }
}