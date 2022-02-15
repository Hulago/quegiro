# Prozis Multi-Apps

# Setup

O package.json root define as entradas das nossas apps/libs etc através do array workspace. As directorias listadas no array serão varridas pelo plugin afim de se criar os alias necessários para resolução de imports. Cada package deve conter um package.json com a minima configuração abaixo:

```
{
  "name": "@quegiro/organization",
  "version": "1.0.0",
  "source": "./src",
  "main": "./dist/main.umd.js",
  "module": "./dist/main.es.js",
  "exports": {
    ".": {
      "import": "./dist/main.es.js",
      "require": "./dist/main.umd.js"
    }
  },
  "config": { // Opcional
    "rollupOptions": {
      "input": {
        "main": "./index.html",
        "todos": "./pages/todos/index.html"
      }
    }
  },
  "types": "src/main.ts"
}
```

As entradas source e types são necessárias para o nosso plugin criar todos os alias corretamente. Quanto ao config pode se passar opções de build do vite bem como opções de rollupOptions, onde cada app possa ter a sua particularidade de build.
Na criação de um package deve também ser adicionado no tsconfig de root o seu namespace e directoria, para se usar nos imports de qq package. Na criação de uma app o seu tsconfig deve ser nomeado como: tsconfig.build.json extendendo o tsconfig de root.
