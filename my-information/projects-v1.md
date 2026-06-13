# Engineering Portfolio — Internal Technical Understanding

## Fitdys AI — AI Fitness Ecosystem

Fitdys AI was designed as a full-stack AI-powered fitness ecosystem rather than a simple workout tracker. The system included a cross-platform mobile application for end users, dedicated dashboards for coaches and administrators, real-time communication infrastructure, AI-assisted planning systems, gamification layers, and content-management integrations.

The mobile platform was built using Expo React Native with Expo Router and Redux for scalable navigation and centralized state management. Expo was selected primarily for rapid cross-platform delivery, OTA update support, native-device abstraction, faster iteration cycles, and simplified Android/iOS deployment pipelines during MVP-stage development. The frontend architecture followed a modular screen/component structure optimized for maintainability and feature isolation.

Core user-facing features included:

- AI-generated diet plans
- AI-generated workout systems
- FitBot conversational AI assistant
- Coach-to-user realtime chat
- Fitness challenges and progression systems
- Token-based reward mechanics
- Headless CMS-powered fitness blogs

The backend stack consisted of Node.js, Express.js, PostgreSQL (NeonDB), Prisma ORM, Redis Cloud, BullMQ, LangChain, Gemini AI, WebSockets, AWS S3, and Railway deployment infrastructure.

PostgreSQL was selected over MongoDB because the platform required highly relational structures between users, coaches, plans, conversations, rewards, challenges, and transactional records. Prisma simplified schema consistency, migrations, and type-safe querying while maintaining rapid backend iteration speed.

Realtime chat infrastructure was implemented through authenticated WebSocket communication. Users and coaches joined conversation rooms dynamically after token verification and role authorization. Conversation channels were generated using user identifiers and role validation to maintain secure message routing and persistent communication sessions.

FitBot was implemented using LangChain orchestration with Gemini AI integration. The AI layer was context-aware and dynamically generated diet/workout recommendations using structured user-profile inputs such as fitness goals, activity level, body metrics, and engagement history. Redis and BullMQ were integrated for asynchronous queue handling and AI-processing workloads to prevent blocking API execution during intensive generation tasks.

The platform also integrated a tokenized engagement model where challenge participation and fitness consistency rewarded users with platform tokens, later redeemable for live coach interactions. Fitness challenges included milestone-based objectives such as daily step targets and cumulative lifting goals.

Content management was powered using headless CMS architecture through Contentful, enabling administrators to publish and manage fitness blogs independently from frontend deployment cycles.

Infrastructure components included:

- Railway for backend deployment
- NeonDB PostgreSQL
- Redis Cloud for queues/caching
- AWS S3 for media storage
- WebSocket realtime infrastructure

Although not commercially scaled, the system was architected with production-oriented patterns including async processing, modular services, queue systems, realtime communication, role-aware APIs, and scalable relational database design.

The project demonstrates practical experience in:

- AI-assisted SaaS architecture
- realtime systems
- queue orchestration
- mobile/backend integration
- cloud storage systems
- relational data modeling
- conversational AI workflows

---

## ERP Next — Internal Enterprise Resource Planning System

ERP Next was an internally deployed enterprise management platform developed using Next.js App Router architecture and PostgreSQL infrastructure. The platform was built as a centralized operational system for company-level workflow management and employee administration.

The ERP included modules for:

- accounting management
- salary processing
- leave management
- recruitment workflows
- job postings/applications
- employee task tracking
- internal announcements
- operational updates

The platform served a single organization with 30+ active internal users and was designed as a role-based operational dashboard rather than a public SaaS system.

The entire backend was integrated directly within the Next.js application using REST-based API routes. This simplified deployment architecture, reduced operational complexity, and enabled faster development cycles for internal tooling requirements.

The frontend was built using Next.js App Router for improved layout composition, nested routing, server-component support, and scalable dashboard rendering. The application architecture emphasized modular business-domain separation, reusable dashboard components, and centralized state-driven operational workflows.

PostgreSQL was selected because ERP systems inherently require relational consistency across employees, payroll, applications, leave systems, announcements, and task-management workflows. Vercel PostgreSQL was used as the managed database infrastructure.

The system focused heavily on operational efficiency and centralized business visibility. Major workflows included:

- employee attendance and leave coordination
- HR recruitment pipelines
- task/status management
- announcement broadcasting
- salary/accounting record maintenance

The project demonstrates practical understanding of:

- enterprise dashboard architecture
- internal tooling systems
- relational business-data modeling
- App Router-based Next.js systems
- REST API architecture
- organization-level workflow management

---

## Morph AI — Multi-Model AI Orchestration Platform

Morph AI was designed as a consumer-facing AI orchestration platform that unified multiple AI models and AI-powered workflows into a single mobile application. The system combined AI image processing, conversational AI, and multi-model subscriptions under one centralized interface.

The application supported both image and text-based AI workflows and targeted general consumers and AI enthusiasts seeking simplified access to multiple AI capabilities without managing separate tools or subscriptions.

The mobile platform was built using Expo React Native and TypeScript to accelerate cross-platform delivery and maintain rapid iteration cycles. The architecture emphasized modular AI-service abstraction, asynchronous processing, optimized rendering pipelines, and scalable API-driven orchestration.

Core AI features included:

- AI image upscaling
- object removal
- recoloring
- background removal
- conversational AI
- multi-model access orchestration

The AI infrastructure combined OpenAI services, TensorFlow.js pipelines, and model orchestration layers to distribute workloads between cloud inference systems and optimized client-side processing. Computationally intensive image operations were offloaded to backend AI-processing pipelines while lightweight transformations were partially optimized for mobile responsiveness.

The orchestration layer acted as a unified gateway for multiple AI providers and workflows. Instead of binding the application to a single model vendor, the platform abstracted AI services into interchangeable modules capable of routing requests to specialized AI systems depending on task type.

The backend architecture likely involved:

- Node.js service orchestration
- asynchronous job queues
- AI request scheduling
- storage pipelines
- API abstraction layers
- subscription management systems

Performance optimization was a major engineering focus. Image-processing workflows were optimized to maintain sub-1.5-second filter application times under heavy usage scenarios through asynchronous processing pipelines and response optimization strategies.

The platform was successfully deployed to the Google Play Store, achieved 1k+ downloads, implemented subscription monetization, and integrated advertisement-based revenue systems. CI/CD workflows were also integrated to accelerate feature delivery and maintain frequent deployment cycles.

Morph AI demonstrates experience in:

- AI product engineering
- multi-model orchestration systems
- AI abstraction architecture
- mobile AI application development
- asynchronous processing pipelines
- AI SaaS monetization
- production mobile deployment
- performance optimization for AI workloads

---

# Portfolio-Level Engineering Characteristics

Across these systems, the consistent engineering patterns include:

- React Native + modern frontend ecosystems
- Node.js-based API infrastructures
- relational database modeling with PostgreSQL
- AI workflow integration
- asynchronous processing systems
- realtime communication architecture
- cloud-native deployment patterns
- modular service design
- scalable dashboard/admin systems
- mobile-first product development

The combined portfolio spans:

- AI SaaS systems
- realtime communication platforms
- enterprise tooling
- AI orchestration infrastructure
- mobile product ecosystems
- operational workflow systems

From a technical maturity perspective, the strongest demonstrated areas are:

- full-stack product architecture
- AI integration engineering
- realtime systems
- scalable backend design
- mobile-first AI application development
- operational dashboard systems
- async queue-based workflows
- cross-platform product engineering
