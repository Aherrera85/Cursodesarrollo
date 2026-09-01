# Gestor de Tareas Constitution
<!--
Sync Impact Report
- Version change: 0.1.0 → 1.0.0
- Modified principles: new constitution created
- Added sections: Core Principles, Additional Constraints, Development Workflow, Governance
- Removed sections: none
- Follow-up TODOs: none
-->

## Core Principles

### I. Código limpio y mantenible
El código debe escribirse con nombres claros, funciones pequeñas y lógica consistente, con comentarios en español cuando aporten contexto técnico o de negocio. Se prohíben los bloques duplicados, los nombres ambiguos, la lógica acoplada y los comentarios vacíos que no ayuden a entender la intención del sistema. La claridad es prioridad sobre la optimización prematura y cualquier cambio debe ser fácil de leer, revisar y depurar.

### II. Accesibilidad y experiencia responsiva mobile-first
La interfaz debe cumplir con principios básicos de accesibilidad: contraste suficiente, etiquetas semánticas, foco visible, navegación por teclado y control claro de estados. El diseño debe comenzar desde mobile-first y escalar de forma progresiva para pantallas más grandes sin romper la legibilidad ni la usabilidad. Las acciones clave deben poder ejecutarse con un solo dedo y sin depender exclusivamente de interacciones con mouse.

### III. Simplicidad por defecto
El proyecto debe priorizar la simplicidad y usar únicamente HTML, CSS y JavaScript vanilla para la aplicación principal. No se aceptan frameworks, librerías externas, dependencias de terceros ni herramientas de compilación para la implementación base. Cualquier complejidad adicional debe estar justificada por un requisito funcional real y debe mantenerse documentada.

### IV. Persistencia local con localStorage
La aplicación debe simular una base de datos mediante localStorage como mecanismo principal de persistencia. Cada operación de creación, lectura, actualización y eliminación debe reflejar el estado real del almacenamiento y mantener una coherencia entre la interfaz y los datos guardados. La estructura de datos debe mantenerse estable y las migraciones simples deben documentarse cuando cambien los campos o el formato.

### V. Calidad verificable mediante pruebas manuales documentadas
El 100% de las funciones críticas del CRUD deben contar con pruebas manuales documentadas antes de considerarse aceptadas. Esto incluye creación, lectura, actualización, eliminación, validación de formularios, manejo de tareas vacías y recuperación ante errores de entrada. Cada prueba debe describir pasos, resultado esperado y evidencia de cumplimiento, y debe revisarse en cada entrega.

## Additional Constraints

- El proyecto debe ser autocontenido y ejecutarse sin dependencias externas ni servicios remotos.
- La funcionalidad base debe ser usable sin instalación de paquetes ni conexión a APIs.
- La estructura de archivos debe mantenerse simple, comprensible y sostenida en HTML, CSS y JavaScript.
- Se debe evitar la lógica dispersa y la duplicación de estados entre interfaz y almacenamiento local.
- Las decisiones de diseño, accesibilidad y experiencia deben revisarse antes de cerrar cualquier entrega.

## Development Workflow

- Cada funcionalidad debe implementarse con una intención clara, validando primero el caso de uso y luego la lógica de persistencia.
- El código debe mantenerse legible y modular sin sacrificar la rapidez de desarrollo.
- Los cambios que afecten datos almacenados en localStorage deben conservar compatibilidad con la información ya guardada.
- La validación debe incluir pruebas manuales de las operaciones CRUD y verificación visual en dispositivos móviles y escritorio.
- Antes de dar por terminada una tarea, debe confirmarse que la UI, la accesibilidad y la persistencia siguen funcionando en conjunto.

## Governance

Esta constitución es la base normativa del proyecto y tiene prioridad sobre prácticas informales o atajos de implementación. Cualquier cambio debe documentarse con una justificación clara, revisión del impacto en los principios y un incremento de versión correspondiente. La complejidad innecesaria, la introducción de dependencias externas y cualquier regresión en accesibilidad o persistencia deben justificarse explícitamente antes de aprobarse.

**Version**: 1.0.0 | **Ratified**: 2026-09-01 | **Last Amended**: 2026-09-01
