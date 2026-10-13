[readme.md](https://github.com/user-attachments/files/33409387/readme.md)
# Mueve Más (KineSenior) 🩺💪

[![Status](https://img.shields.io/badge/status-active%20prototyping-emerald?style=for-the-badge)](https://github.com/)
[![Tech Stack](https://img.shields.io/badge/stack-Vanilla%20JS%20|%20Tailwind%20|%20Supabase-blue?style=for-the-badge)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)](https://github.com/)

**Mueve Más** es una plataforma digital de telerehabilitación, autogestión de movilidad y acompañamiento clínico orientada a adultos mayores y sus cuidadores en Chile. Su objetivo principal es derribar las barreras de desplazamiento, entregando pautas de ejercicios seguras y bajo supervisión kinesiológica acreditada.

---

## ✨ Características Principales

1. **Cuestionario Triage Clínico (3 Pasos):** Evaluación automatizada de síntomas, zonas de dolor (artrosis, columna, equilibrio) y comorbilidades (HTA, diabetes).
2. **Sincronización con Supabase (BaaS):** Registro asíncrono y seguro de leads y evaluaciones en una base de datos relacional PostgreSQL.
3. **Portal del Paciente Interactivo:** Pauta guiada de ejercicios en tiempo real con contadores de progreso, botones de confirmación y feedback de síntomas.
4. **Pasarela de Pagos Simulada (Webpay / Transbank):** Simulación de pagos seguros con validación de consentimientos informados y selección de planes de rehabilitación.
5. **Agendamiento Domiciliario con Control de Concurrencia:** Bloqueos temporales de horarios (10 minutos) para evitar conflictos de reserva simultánea.
6. **Asistente Virtual 24/7:** Widget inteligente integrado con base de conocimiento local para responder dudas frecuentes sobre patologías y reembolsos Fonasa/Isapre.
7. **Diseño Gerontológico Accesible:** Interfaz limpia basada en Tailwind CSS con tipografías legibles (*Plus Jakarta Sans*), altos contrastes y enfoque inclusivo para la tercera edad.

---

## 🛠️ Stack Tecnológico

* **Frontend:** Vanilla JavaScript (ES6+), HTML5 semántico.
* **Estilos:** Tailwind CSS v3 (vía CDN con configuración personalizada de paleta de colores).
* **Iconografía:** Lucide Icons.
* **Backend & Base de Datos:** Supabase (`@supabase/supabase-js@2` con PostgreSQL y Row Level Security).
* **Hosting / Despliegue:** Preparado para Vercel o Netlify (Costo Operativo $0 USD).

---

## 🚀 Guía de Instalación y Pruebas Locales

Para probar este prototipo en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/pffuenzalidap/Prototipo_Mueve_Mas.git
   cd Prototipo_Mueve_Mas
   ```

2. **Abre el proyecto:**
   Abre la carpeta en tu editor de código favorito (como **Visual Studio Code** o **Cursor**).

3. **Ejecuta un servidor local:**
   Instala la extensión **Live Server** en VS Code y haz clic en *Go Live* en el archivo `index.html`, o utiliza cualquier servidor local estático (como Python o Node.js).

4. **Configura Supabase:**
   Asegúrate de inicializar tu cliente de Supabase en el script del proyecto con tus credenciales válidas (`SUPABASE_URL` y `SUPABASE_ANON_KEY`) apuntando a tu tabla `evaluaciones`.

---

## 👥 Contribución y Licencia

Este es un prototipo clínico en constante evolución. Si deseas proponer mejoras o reportar problemas, por favor abre un *Pull Request* o un *Issue* en este repositorio. 

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
