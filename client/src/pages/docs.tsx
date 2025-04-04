import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, Code, Building2, School, Headset, Rocket, BookOpen, 
  MessageSquare, BarChart, Users, Bot, File, Monitor, Smartphone, 
  ExternalLink, CheckCircle2, BarChart3, LineChart
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Nuevas secciones para funcionalidades específicas
  const functionalityTabs = [
    "widget-integration", 
    "contextual-understanding", 
    "document-training", 
    "lead-capture", 
    "analytics", 
    "task-automation"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Documentación de AIPI
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Todo lo que necesitas saber sobre nuestra plataforma de asistencia inteligente
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="sticky top-24 bg-white dark:bg-gray-900 border rounded-lg p-4">
                  <nav className="space-y-1">
                    <a 
                      href="#overview" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("overview"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "overview" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>Descripción General</span>
                      </div>
                    </a>
                    <a 
                      href="#features" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("features"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "features" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Rocket className="w-5 h-5 mr-2" />
                        <span>Funcionalidades</span>
                      </div>
                    </a>

                    {/* Funcionalidades separadas como submenú */}
                    <a 
                      href="#widget-integration" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("widget-integration"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "widget-integration" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span>Integración de Widgets</span>
                      </div>
                    </a>
                    
                    <a 
                      href="#contextual-understanding" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("contextual-understanding"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "contextual-understanding" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>Comprensión Contextual</span>
                      </div>
                    </a>
                    
                    <a 
                      href="#document-training" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("document-training"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "document-training" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <File className="w-4 h-4 mr-2" />
                        <span>Entrena. con Documentos</span>
                      </div>
                    </a>
                    
                    <a 
                      href="#lead-capture" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("lead-capture"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "lead-capture" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Captura de Leads</span>
                      </div>
                    </a>
                    
                    <a 
                      href="#analytics" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("analytics"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "analytics" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <BarChart className="w-4 h-4 mr-2" />
                        <span>Análisis y Estadísticas</span>
                      </div>
                    </a>
                    
                    <a 
                      href="#task-automation" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("task-automation"); }}
                      className={`block px-3 py-2 pl-10 rounded-md ${activeTab === "task-automation" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-2" />
                        <span>Automatización de Tareas</span>
                      </div>
                    </a>
                    <a 
                      href="#education" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("education"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "education" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <School className="w-5 h-5 mr-2" />
                        <span>Instituciones Educativas</span>
                      </div>
                    </a>
                    <a 
                      href="#business" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("business"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "business" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 mr-2" />
                        <span>Empresas y Negocios</span>
                      </div>
                    </a>
                    <a 
                      href="#professional" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("professional"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "professional" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Headset className="w-5 h-5 mr-2" />
                        <span>Servicios Profesionales</span>
                      </div>
                    </a>
                    <a 
                      href="#implementation" 
                      onClick={(e) => { e.preventDefault(); setActiveTab("implementation"); }}
                      className={`block px-3 py-2 rounded-md ${activeTab === "implementation" ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <div className="flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        <span>Implementación</span>
                      </div>
                    </a>
                  </nav>
                </div>
              </div>
              
              <div className="md:w-3/4">
                {activeTab === "overview" && (
                  <div id="overview" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">AIPI: Asistencia Inteligente para Instituciones y Empresas</h2>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          AIPI es una plataforma avanzada de asistencia por chat impulsada por inteligencia artificial, 
                          diseñada específicamente para ayudar a instituciones educativas, empresas y comercios a transformar 
                          la forma en que interactúan con sus clientes y estudiantes potenciales. En un contexto donde la 
                          sobrecarga de información se ha vuelto un problema significativo, AIPI simplifica la experiencia 
                          del usuario ofreciendo respuestas precisas a través de un agente virtual inteligente.
                        </p>
                        
                        <h3>Problema que Resuelve</h3>
                        <p>
                          Actualmente, las instituciones educativas como CEGEPs y colegios, así como empresas de diversos 
                          sectores, enfrentan el desafío de presentar grandes cantidades de información en sus sitios web. 
                          Los visitantes a menudo se sienten abrumados por este volumen de datos y abandonan el sitio sin 
                          encontrar lo que buscan, resultando en oportunidades perdidas tanto para la institución como para el visitante.
                        </p>
                        <p>
                          AIPI aborda este problema permitiendo a los visitantes interactuar con un asistente virtual que:
                        </p>
                        <ul>
                          <li>Busca información específica entre grandes volúmenes de datos institucionales</li>
                          <li>Responde preguntas en lenguaje natural</li>
                          <li>Personaliza respuestas según el contexto de la conversación</li>
                          <li>Guarda registros de las interacciones para seguimiento posterior</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                          <h3 className="text-xl font-bold">Respuestas Contextuales</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          El asistente virtual comprende el contexto del sitio web y proporciona respuestas precisas basadas en el contenido oficial de tu institución o empresa.
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <Database className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                          <h3 className="text-xl font-bold">Base de Conocimiento</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Entrena a tu asistente con documentos específicos como PDFs, DOCXs o hojas de cálculo para responder preguntas detalladas sobre tus programas o servicios.
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <Users className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                          <h3 className="text-xl font-bold">Generación de Leads</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Captura información de contacto de visitantes interesados para seguimiento posterior, convirtiendo visitas web en oportunidades de admisión o venta.
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <BarChart className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                          <h3 className="text-xl font-bold">Análisis Detallado</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Obtén estadísticas valiosas sobre conversaciones, preguntas frecuentes y áreas de mayor interés para optimizar tu oferta educativa o comercial.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-10">
                      <Button size="lg" asChild>
                        <Link href="/get-started">Comenzar Ahora</Link>
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === "features" && (
                  <div id="features" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Principales Funcionalidades</h2>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <h3>1. Integración Flexible con Sitios Web</h3>
                        <p>
                          AIPI ofrece dos modalidades de integración para adaptarse a las necesidades de cada institución:
                        </p>
                        
                        <h4>Widget Flotante (Burbuja):</h4>
                        <ul>
                          <li>Aparece discretamente en una esquina del sitio web</li>
                          <li>Permite acceso inmediato a la asistencia sin interrumpir la navegación</li>
                          <li>Ideal para consultas rápidas y soporte al visitante</li>
                        </ul>
                        
                        <h4>Pantalla Completa (Estilo ChatGPT):</h4>
                        <ul>
                          <li>Experiencia de chat inmersiva tipo ChatGPT</li>
                          <li>Historial de conversaciones accesible para los usuarios</li>
                          <li>Perfecto para interacciones más profundas y consultas complejas</li>
                        </ul>
                        
                        <h3>2. Comprensión Contextual del Contenido</h3>
                        <p>AIPI escanea y analiza automáticamente el contenido de su sitio web para:</p>
                        <ul>
                          <li>Proporcionar respuestas precisas basadas en la información oficial</li>
                          <li>Dirigir a los visitantes a las páginas específicas que contienen la información solicitada</li>
                          <li>Reducir la frustración de buscar información en múltiples secciones del sitio</li>
                        </ul>
                        
                        <h3>3. Entrenamiento Personalizado con Documentos Específicos</h3>
                        <p>La plataforma permite cargar y procesar:</p>
                        <ul>
                          <li>Documentos PDF (catálogos de cursos, folletos de programas, especificaciones de productos)</li>
                          <li>Archivos DOCX (preguntas frecuentes, políticas institucionales)</li>
                          <li>Hojas de cálculo Excel (horarios, tarifas, listas de programas)</li>
                          <li>Instrucciones específicas sobre el tono y estilo de las respuestas</li>
                        </ul>
                        
                        <h3>4. Captura de Leads y Seguimiento</h3>
                        <p>Una de las características más valiosas para instituciones educativas y empresas:</p>
                        <ul>
                          <li>Registro detallado de todas las conversaciones con visitantes</li>
                          <li>Identificación de consultas frecuentes y áreas de interés</li>
                          <li>Almacenamiento de información de contacto (con consentimiento del usuario)</li>
                          <li>Posibilidad de seguimiento posterior para ofrecer información adicional o servicios relacionados</li>
                        </ul>
                        
                        <h3>5. Análisis y Estadísticas Detalladas por Usuario</h3>
                        <p>El panel de control administrativo ofrece estadísticas personalizadas para cada cuenta de usuario:</p>
                        <ul>
                          <li>Métricas sobre número total de conversaciones de tus integraciones</li>
                          <li>Tasa de resolución de consultas específica de tu cuenta</li>
                          <li>Tiempo promedio de respuesta de tus asistentes virtuales</li>
                          <li>Tendencias en las consultas de tus visitantes</li>
                          <li>Rendimiento individualizado por tipo de integración</li>
                          <li>Análisis de temas y productos de mayor interés para tus usuarios</li>
                        </ul>
                        
                        <h3>6. Automatización de Tareas (Task Automation)</h3>
                        <p>El sistema de Task Automation de AIPI permite crear flujos de trabajo automatizados para manejar consultas repetitivas y tareas comunes sin intervención humana.</p>
                        
                        <h4>¿Qué es Task Automation?</h4>
                        <p>Task Automation es una funcionalidad avanzada que permite configurar respuestas automáticas y acciones predefinidas basadas en desencadenantes específicos. Estas automatizaciones permiten que su asistente virtual realice tareas complejas como:</p>
                        <ul>
                          <li>Responder automáticamente preguntas frecuentes con información detallada</li>
                          <li>Programar seguimientos basados en el interés mostrado por los visitantes</li>
                          <li>Proporcionar información preliminar antes de conectar con un representante humano</li>
                          <li>Recopilar datos específicos necesarios para procesos de admisión o ventas</li>
                          <li>Generar alertas para el equipo cuando se detecten consultas prioritarias</li>
                          <li>Clasificar automáticamente las consultas por departamento o área de interés</li>
                        </ul>
                        
                        <h4>Cómo Configurar una Task Automation</h4>
                        <p>Para crear una nueva automatización de tareas, siga estos pasos:</p>
                        <ol>
                          <li><strong>Acceda al Panel de Control:</strong> Inicie sesión y navegue a la pestaña "Task Automation" en su dashboard</li>
                          <li><strong>Cree una Nueva Automatización:</strong> Haga clic en el botón "Create New Automation" para abrir el formulario de configuración</li>
                          <li><strong>Defina la Información Básica:</strong>
                            <ul>
                              <li>Nombre: Asigne un nombre descriptivo a la automatización (ej. "Consultas sobre Admisiones")</li>
                              <li>Descripción: Detalle el propósito de esta automatización</li>
                              <li>Estado: Seleccione si la automatización estará activa, en pruebas o inactiva</li>
                            </ul>
                          </li>
                          <li><strong>Configure los Desencadenantes (Triggers):</strong> Determine qué condiciones activarán la automatización
                            <ul>
                              <li>Palabras clave específicas en las consultas de los usuarios</li>
                              <li>Categorías de preguntas identificadas por el sistema</li>
                              <li>Patrones específicos en la conversación</li>
                              <li>Horario (para respuestas fuera del horario de atención)</li>
                            </ul>
                          </li>
                          <li><strong>Defina las Acciones:</strong> Establezca qué acciones realizará el sistema cuando se active
                            <ul>
                              <li>Enviar respuestas predefinidas con información detallada</li>
                              <li>Recopilar datos del visitante (nombre, correo, teléfono)</li>
                              <li>Generar notificaciones para el equipo de atención</li>
                              <li>Transferir la conversación a un representante humano</li>
                              <li>Proporcionar enlaces a recursos específicos</li>
                            </ul>
                          </li>
                          <li><strong>Personalice la Experiencia:</strong> Ajuste la apariencia y comportamiento del asistente
                            <ul>
                              <li>Nombre del asistente para esta automatización</li>
                              <li>Mensaje de bienvenida personalizado</li>
                              <li>Colores y estilo visual</li>
                              <li>Base de conocimiento específica para esta automatización</li>
                            </ul>
                          </li>
                          <li><strong>Pruebe la Automatización:</strong> Active el modo de prueba para verificar su funcionamiento</li>
                          <li><strong>Active y Monitoree:</strong> Una vez verificado su correcto funcionamiento, active la automatización y supervise su rendimiento a través del panel de análisis</li>
                        </ol>
                        
                        <h4>Casos de Uso Comunes</h4>
                        <p>Las automatizaciones de tareas son especialmente útiles para:</p>
                        <ul>
                          <li><strong>Instituciones Educativas:</strong> Automatizar respuestas sobre fechas de admisión, requisitos, costos de matrícula y programas disponibles</li>
                          <li><strong>Comercios:</strong> Manejar consultas sobre disponibilidad de productos, precios, políticas de devolución y horarios de atención</li>
                          <li><strong>Servicios Profesionales:</strong> Responder a preguntas frecuentes sobre servicios ofrecidos, tarifas y procesos de contratación</li>
                          <li><strong>Atención al Cliente:</strong> Clasificar y priorizar automáticamente las consultas de soporte según su urgencia y complejidad</li>
                        </ul>
                        
                        <h4>Beneficios de Task Automation</h4>
                        <ul>
                          <li><strong>Ahorro de Tiempo:</strong> Libera a su equipo de responder repetidamente las mismas preguntas</li>
                          <li><strong>Consistencia:</strong> Garantiza que todas las consultas similares reciban la misma información precisa</li>
                          <li><strong>Disponibilidad 24/7:</strong> Proporciona respuestas inmediatas incluso fuera del horario laboral</li>
                          <li><strong>Escalabilidad:</strong> Permite manejar un mayor volumen de consultas sin aumentar el personal</li>
                          <li><strong>Calificación de Leads:</strong> Identifica automáticamente los prospectos más prometedores para seguimiento prioritario</li>
                        </ul>
                        
                        <h4>Ejemplo Práctico: Task Automation + Web Integration</h4>
                        <p>A continuación se presenta un ejemplo detallado de cómo una Task Automation puede mejorar el rendimiento de una integración web:</p>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 my-4">
                          <h5 className="font-bold mb-2">Caso: Universidad que Ofrece Programas de Postgrado</h5>
                          
                          <p className="mb-3"><strong>Escenario inicial:</strong> La universidad tiene una integración web de AIPI en su sitio web principal, en formato widget flotante. Sin automatizaciones, el asistente responde preguntas generales sobre la universidad.</p>
                          
                          <p className="font-medium">Implementación de Automatización:</p>
                          <ol className="space-y-2 mb-3">
                            <li>1. Se crea una <strong>Task Automation</strong> específica llamada "Admisiones Postgrado 2026"</li>
                            <li>2. Se configura con los siguientes desencadenantes:
                              <ul className="list-disc pl-6 my-1">
                                <li>Palabras clave: "postgrado", "maestría", "doctorado", "2026", "requisitos"</li>
                                <li>Rutas URL: cualquier página bajo "/postgrados/*" en el sitio web</li>
                              </ul>
                            </li>
                            <li>3. Se definen las acciones automatizadas:
                              <ul className="list-disc pl-6 my-1">
                                <li>Saludo personalizado: "Bienvenido al asistente de admisiones para programas de postgrado 2026"</li>
                                <li>Mensaje proactivo: "Veo que estás interesado en nuestros programas de postgrado. ¿Puedo ayudarte con información sobre algún programa específico?"</li>
                                <li>Recopilación de datos del visitante si muestra interés específico</li>
                              </ul>
                            </li>
                            <li>4. Se carga una base de conocimiento específica:
                              <ul className="list-disc pl-6 my-1">
                                <li>Documentos PDF con los nuevos catálogos de programas 2026</li>
                                <li>Fechas actualizadas del proceso de admisión</li>
                                <li>Nuevos requisitos y cambios en las becas disponibles</li>
                              </ul>
                            </li>
                            <li>5. Se conecta esta automatización a la <strong>integración web existente</strong> (el widget del sitio)</li>
                          </ol>
                          
                          <p className="font-medium">Resultados:</p>
                          <ul className="list-disc pl-6 space-y-1 mb-3">
                            <li>Cuando un visitante navega por la sección de postgrados, el widget cambia automáticamente su comportamiento</li>
                            <li>Ofrece proactivamente ayuda específica sobre admisiones 2026 en lugar de esperar a que el usuario inicie la conversación</li>
                            <li>Proporciona información precisa y actualizada de los nuevos programas</li>
                            <li>Identifica automáticamente candidatos potenciales, solicitando su correo para enviar información detallada</li>
                            <li>Generar reportes específicos sobre el interés en los programas de postgrado 2026</li>
                          </ul>
                          
                          <p className="font-medium">Métricas de impacto:</p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Aumento del 40% en la tasa de interacción con el widget en las páginas de postgrado</li>
                            <li>Incremento del 25% en formularios de interés completados</li>
                            <li>Reducción del 30% en consultas repetitivas al departamento de admisiones</li>
                            <li>Mejora de la experiencia del usuario con un 90% de valoraciones positivas</li>
                          </ul>
                        </div>
                        
                        <p>Este ejemplo ilustra cómo una Task Automation puede transformar una integración web genérica en una herramienta de captación altamente especializada, que responde de manera contextual y proactiva según las necesidades específicas de cada sección del sitio web.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Sección de Widget Integration */}
                {activeTab === "widget-integration" && (
                  <div id="widget-integration" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Integración de Widgets en Sitios Web</h2>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          AIPI ofrece dos tipos diferentes de widgets para integrarse de manera flexible en tu sitio web, 
                          permitiéndote elegir la opción que mejor se adapte a las necesidades de tu organización y la 
                          experiencia que deseas ofrecer a tus visitantes.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                          <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-5 bg-primary-50 dark:bg-gray-800">
                            <div className="flex items-center mb-3">
                              <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400">Widget Flotante (Burbuja)</h3>
                            </div>
                            <p className="mb-3">
                              Una pequeña burbuja discreta que aparece en una esquina de tu sitio web. Los visitantes pueden
                              hacer clic en ella para abrir un panel de chat compacto sin perder visibilidad del contenido principal.
                            </p>
                            <h4 className="font-semibold mt-4 mb-2">Características:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Mínimamente invasivo - no interrumpe la experiencia de navegación</li>
                              <li>Personalización de colores y posición (esquina inferior derecha o izquierda)</li>
                              <li>Opción de mensaje de bienvenida proactivo configurable</li>
                              <li>Interfaz de chat responsiva que se adapta a dispositivos móviles</li>
                            </ul>
                          </div>
                          
                          <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-5 bg-primary-50 dark:bg-gray-800">
                            <div className="flex items-center mb-3">
                              <Monitor className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400">Pantalla Completa (Estilo ChatGPT)</h3>
                            </div>
                            <p className="mb-3">
                              Una experiencia inmersiva similar a ChatGPT que ocupa toda la pantalla, ideal para interacciones
                              más profundas y extensas. Perfecto para sitios que ofrecen el chat como servicio principal.
                            </p>
                            <h4 className="font-semibold mt-4 mb-2">Características:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Historial de conversaciones persistente para los usuarios</li>
                              <li>Presentación de sugerencias y temas frecuentes</li>
                              <li>Soporte para cargas y descargas de archivos</li>
                              <li>Personalización completa de la interfaz con tu imagen de marca</li>
                            </ul>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mt-8 mb-4">Ejemplo Práctico: Universidad con Múltiples Facultades</h3>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 my-4">
                          <h4 className="font-semibold text-lg mb-3">Caso de Implementación:</h4>
                          <p className="mb-3">
                            La Universidad Nacional de Tecnología implementó el widget flotante de AIPI en su sitio web principal
                            y en los sitios específicos de cada facultad con configuraciones adaptadas para cada contexto.
                          </p>
                          
                          <h5 className="font-medium mt-4 mb-2">Configuración:</h5>
                          <ul className="list-disc pl-5 mb-4">
                            <li><strong>Sitio principal:</strong> Widget flotante con conocimiento general sobre admisiones, becas y vida universitaria</li>
                            <li><strong>Facultad de Ingeniería:</strong> Widget especializado con datos sobre programas técnicos y requisitos específicos</li>
                            <li><strong>Facultad de Medicina:</strong> Asistente con información sobre procesos de admisión especiales y pasantías clínicas</li>
                            <li><strong>Portal de Estudiantes:</strong> Implementación pantalla completa para consultas detalladas sobre horarios y trámites</li>
                          </ul>
                          
                          <h5 className="font-medium mt-4 mb-2">Resultados:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center text-primary-700 dark:text-primary-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-medium">42% más consultas resueltas</span>
                              </div>
                              <p className="text-sm mt-1">Sin necesidad de contactar al personal administrativo</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center text-primary-700 dark:text-primary-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-medium">35% reducción en emails</span>
                              </div>
                              <p className="text-sm mt-1">De consultas básicas a departamentos académicos</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center text-primary-700 dark:text-primary-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-medium">27% aumento en aplicaciones</span>
                              </div>
                              <p className="text-sm mt-1">Con información completa y correcta desde el inicio</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center text-primary-700 dark:text-primary-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-medium">1,250+ leads generados</span>
                              </div>
                              <p className="text-sm mt-1">De estudiantes potenciales en un semestre</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                            "El widget de AIPI revolucionó nuestra forma de comunicarnos con estudiantes potenciales. 
                            Ahora podemos ofrecer información específica para cada facultad de manera instantánea, 
                            capturar datos de contacto y hacer seguimiento personalizado."
                            <div className="mt-1 font-medium">— Directora de Admisiones, Universidad Nacional de Tecnología</div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mt-8 mb-4">Implementación Técnica</h3>
                        
                        <p className="mb-4">Integrar cualquiera de los widgets en tu sitio web es extremadamente sencillo y requiere solo unas pocas líneas de código:</p>
                        
                        <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                          <pre><code>{`<script>
  (function(w,d,s,o,f,js,fjs){
    w['AIPI-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','aipi','https://tu-dominio.com/widget.js'));
  
  aipi('init', { 
    apiKey: 'TU_API_KEY',
    widgetType: 'bubble', // o 'fullscreen'
    position: 'bottom-right',
    themeColor: '#4F46E5',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte hoy?'
  });
</script>`}</code></pre>
                        </div>
                        
                        <h4 className="font-semibold mt-6 mb-2">Parámetros de Configuración:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">apiKey</code>: Tu clave de API única generada en el panel de control de AIPI</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">widgetType</code>: El tipo de widget ('bubble' o 'fullscreen')</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">position</code>: Ubicación en la pantalla (para widget tipo burbuja)</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">themeColor</code>: Color principal que se usará en el widget</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">welcomeMessage</code>: Mensaje inicial que se mostrará al abrir el chat</li>
                        </ul>
                        
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">¿Necesitas más opciones de personalización?</h4>
                              <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                                Visita la <a href="#implementation" className="underline font-medium" onClick={(e) => { e.preventDefault(); setActiveTab("implementation"); }}>
                                sección de implementación</a> para ver la documentación técnica completa con todas las opciones disponibles.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Sección de Comprensión Contextual */}
                {activeTab === "contextual-understanding" && (
                  <div id="contextual-understanding" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Comprensión Contextual del Contenido Web</h2>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          Una de las características más poderosas de AIPI es su capacidad para comprender y analizar 
                          automáticamente el contenido de tu sitio web, brindando respuestas contextuales precisas sin 
                          necesidad de programación manual o entrenamiento específico.
                        </p>
                        
                        <h3 className="text-xl font-bold mt-6 mb-3">¿Cómo Funciona?</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <h4 className="font-semibold mb-2 flex items-center text-primary-700 dark:text-primary-400">
                              <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                              Escaneo Inteligente
                            </h4>
                            <p className="text-sm">
                              Cuando un visitante interactúa con el widget, AIPI escanea automáticamente la página 
                              actual y otras páginas relevantes del sitio para obtener contexto.
                            </p>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <h4 className="font-semibold mb-2 flex items-center text-primary-700 dark:text-primary-400">
                              <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                              Análisis Semántico
                            </h4>
                            <p className="text-sm">
                              La inteligencia artificial procesa el contenido para comprender su significado, 
                              identificando temas clave, servicios, productos y otra información relevante.
                            </p>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <h4 className="font-semibold mb-2 flex items-center text-primary-700 dark:text-primary-400">
                              <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                              Generación de Respuestas
                            </h4>
                            <p className="text-sm">
                              Con base en esta comprensión, el sistema proporciona respuestas precisas y 
                              contextuales, incluyendo enlaces a las secciones relevantes del sitio.
                            </p>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mt-8 mb-4">Ejemplo Práctico: Tienda de Comercio Electrónico</h3>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 my-4">
                          <h4 className="font-semibold text-lg mb-3">Caso de Implementación:</h4>
                          <p className="mb-3">
                            TechGadgets, una tienda online especializada en productos electrónicos, implementó AIPI para 
                            mejorar la asistencia a sus clientes y aumentar las conversiones.
                          </p>
                          
                          <div className="border-l-4 border-primary-500 pl-4 py-1 my-4 bg-primary-50 dark:bg-primary-900/20">
                            <h5 className="font-medium">Consulta de cliente:</h5>
                            <p className="italic">
                              "¿Este modelo de laptop es compatible con programas de diseño gráfico profesional?"
                            </p>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium mb-2">Proceso de AIPI:</h5>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>
                                <strong>Análisis de Contexto:</strong> 
                                <p className="text-sm">
                                  AIPI detectó que el usuario estaba viendo la página de un modelo específico de laptop.
                                </p>
                              </li>
                              <li>
                                <strong>Extracción de Información:</strong> 
                                <p className="text-sm">
                                  El sistema extrajo las especificaciones técnicas del producto (procesador, memoria RAM, 
                                  tarjeta gráfica) de la página del producto.
                                </p>
                              </li>
                              <li>
                                <strong>Conexión con Conocimiento:</strong> 
                                <p className="text-sm">
                                  Relacionó estas especificaciones con los requisitos típicos de software de diseño gráfico
                                  mencionados en otras páginas del sitio, como guías y comparativas.
                                </p>
                              </li>
                            </ol>
                          </div>
                          
                          <div className="border-l-4 border-green-500 pl-4 py-1 my-4 bg-green-50 dark:bg-green-900/20">
                            <h5 className="font-medium">Respuesta generada:</h5>
                            <p className="italic">
                              "Sí, el Modelo XPS 15 que estás viendo es altamente compatible con software de diseño gráfico 
                              profesional como Adobe Photoshop, Illustrator e InDesign. Con su procesador Intel i7 de 11ª generación, 
                              32GB de RAM y tarjeta NVIDIA RTX 3050, cumple y supera los requisitos recomendados para estos programas. 
                              Además, su pantalla calibrada para precisión de color (100% Adobe RGB) lo hace ideal para trabajo gráfico. 
                              Si necesitas ver más opciones optimizadas para diseño gráfico, <a href="#" className="text-primary-600 dark:text-primary-400">puedes ver nuestra comparativa aquí</a>."
                            </p>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mt-8 mb-4">Beneficios de la Comprensión Contextual</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-primary-700 dark:text-primary-400">Respuestas Inmediatas y Precisas</h4>
                            <p>
                              Los visitantes obtienen información exacta sin tener que navegar por múltiples páginas 
                              buscando respuestas específicas.
                            </p>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-primary-700 dark:text-primary-400">Reducción de Abandono</h4>
                            <p>
                              Al resolver dudas en el momento, se evita que los visitantes abandonen tu sitio por 
                              frustración o falta de información clara.
                            </p>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-primary-700 dark:text-primary-400">Cero Mantenimiento Manual</h4>
                            <p>
                              A diferencia de los sistemas tradicionales de FAQs, AIPI se actualiza automáticamente 
                              cuando modificas el contenido de tu sitio web.
                            </p>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-primary-700 dark:text-primary-400">Información Consistente</h4>
                            <p>
                              Todas las respuestas se basan en el contenido oficial de tu sitio, garantizando 
                              consistencia en la información proporcionada.
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Nota Importante</h4>
                              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                                Para mejorar aún más la precisión de las respuestas contextuales, puedes complementar 
                                esta funcionalidad con el entrenamiento específico usando documentos. Esto es 
                                especialmente útil para información que no está directamente disponible en tu sitio web.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "education" && (
                  <div id="education" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <School className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Para Instituciones Educativas</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          CEGEPs, colegios y universidades enfrentan desafíos únicos en la era digital. 
                          Estudiantes potenciales navegan entre múltiples opciones educativas y a menudo 
                          se sienten abrumados por la cantidad de información disponible. AIPI transforma 
                          este proceso haciéndolo más accesible, personalizado y efectivo.
                        </p>
                        
                        <h3>Beneficios Específicos</h3>
                        
                        <h4>Mejora del Proceso de Admisiones</h4>
                        <ul>
                          <li>Responde preguntas específicas sobre requisitos de admisión, fechas límite y documentación necesaria</li>
                          <li>Guía a los estudiantes paso a paso a través del proceso de solicitud</li>
                          <li>Elimina barreras de acceso a la información crítica para tomar decisiones</li>
                        </ul>
                        
                        <h4>Presentación Efectiva de Programas Académicos</h4>
                        <ul>
                          <li>Proporciona detalles sobre planes de estudio, profesores y salidas profesionales</li>
                          <li>Ayuda a comparar diferentes opciones académicas dentro de la institución</li>
                          <li>Responde preguntas específicas sobre contenidos de cursos y metodologías</li>
                        </ul>
                        
                        <h4>Captación y Seguimiento de Interesados</h4>
                        <ul>
                          <li>Identifica estudiantes con alto potencial de matriculación</li>
                          <li>Registra áreas específicas de interés para seguimiento personalizado</li>
                          <li>Permite al departamento de admisiones priorizar sus esfuerzos en candidatos cualificados</li>
                        </ul>
                        
                        <h4>Soporte 24/7 para Estudiantes Internacionales</h4>
                        <ul>
                          <li>Proporciona información en múltiples idiomas</li>
                          <li>Atiende consultas fuera del horario laboral, esencial para diferentes zonas horarias</li>
                          <li>Ofrece orientación sobre visados, alojamiento y otros aspectos relevantes</li>
                        </ul>
                        
                        <h4>Análisis de Tendencias en la Demanda Educativa de Tu Institución</h4>
                        <ul>
                          <li>Identifica los programas más consultados en tu sitio web</li>
                          <li>Analiza las preocupaciones más frecuentes de tus estudiantes potenciales</li>
                          <li>Proporciona datos valiosos específicos para la planificación estratégica de tu oferta académica</li>
                          <li>Estadísticas segregadas por cuenta de usuario, sin mezclar datos con otras instituciones</li>
                        </ul>
                        
                        <h3>Testimonios</h3>
                        <blockquote>
                          "Desde que implementamos AIPI en nuestro sitio web, hemos visto un incremento del 35% en las solicitudes 
                          de información que se convierten en candidaturas reales. El asistente virtual ha sido clave para ayudar 
                          a los estudiantes a navegar nuestros más de 50 programas académicos."
                          <cite>— Directora de Admisiones, CEGEP Saint-Laurent</cite>
                        </blockquote>
                        
                        <div className="mt-8">
                          <Button size="lg" asChild>
                            <Link href="/get-started">Implementar en Mi Institución</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "business" && (
                  <div id="business" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Para Empresas y Negocios</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          En el entorno empresarial actual, la rapidez en la atención al cliente y la capacidad para 
                          convertir visitantes web en clientes potenciales son factores críticos para el éxito. AIPI 
                          proporciona una solución integral que mejora la experiencia del cliente mientras optimiza 
                          los recursos de atención comercial.
                        </p>
                        
                        <h3>Beneficios Específicos</h3>
                        
                        <h4>Generación y Calificación de Leads</h4>
                        <ul>
                          <li>Identifica visitantes con intención de compra real</li>
                          <li>Recopila información de contacto y necesidades específicas</li>
                          <li>Califica automáticamente leads según el nivel de interés y la etapa del embudo de ventas</li>
                        </ul>
                        
                        <h4>Soporte al Cliente 24/7</h4>
                        <ul>
                          <li>Responde consultas frecuentes sin intervención humana</li>
                          <li>Proporciona información detallada sobre productos y servicios</li>
                          <li>Deriva a atención humana solo cuando es estrictamente necesario</li>
                        </ul>
                        
                        <h4>Presentación Efectiva de Catálogos y Servicios</h4>
                        <ul>
                          <li>Guía a los visitantes a través de extensos catálogos de productos</li>
                          <li>Sugiere productos relevantes basados en las necesidades expresadas</li>
                          <li>Facilita comparaciones y ayuda en la toma de decisiones de compra</li>
                        </ul>
                        
                        <h4>Optimización del Proceso de Ventas</h4>
                        <ul>
                          <li>Proporciona información preliminar valiosa al equipo de ventas</li>
                          <li>Reduce el tiempo dedicado a consultas básicas o no cualificadas</li>
                          <li>Permite que los comerciales se concentren en prospectos de alta calidad</li>
                        </ul>
                        
                        <h4>Análisis del Comportamiento de Tus Clientes</h4>
                        <ul>
                          <li>Identifica tendencias en las consultas y necesidades específicas de tu mercado</li>
                          <li>Proporciona insights exclusivos sobre objeciones frecuentes de tus clientes</li>
                          <li>Ayuda a refinar ofertas y mensajes comerciales basados en tus datos propios</li>
                          <li>Métricas segmentadas por cuenta de usuario para mantener la privacidad y relevancia</li>
                        </ul>
                        
                        <h3>Testimonios</h3>
                        <blockquote>
                          "Al implementar AIPI, conseguimos reducir en un 45% el tiempo que nuestro equipo 
                          dedicaba a responder consultas básicas. Ahora pueden concentrarse en cerrar ventas, 
                          mientras el asistente virtual se encarga de educar a los clientes y recopilar información 
                          crucial para nuestro seguimiento comercial."
                          <cite>— Director Comercial, TechSolutions Inc.</cite>
                        </blockquote>
                        
                        <div className="mt-8">
                          <Button size="lg" asChild>
                            <Link href="/get-started">Implementar en Mi Empresa</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "professional" && (
                  <div id="professional" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Headset className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Para Servicios Profesionales</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          Abogados, contadores, consultores, agencias de marketing y otros profesionales independientes 
                          pueden beneficiarse enormemente de la implementación de AIPI en sus sitios web. La solución 
                          permite ofrecer una experiencia de alto nivel a potenciales clientes mientras se optimiza 
                          el tiempo dedicado a la captación.
                        </p>
                        
                        <h3>Beneficios Específicos</h3>
                        
                        <h4>Pre-cualificación de Clientes</h4>
                        <ul>
                          <li>Identifica las necesidades específicas del cliente antes del primer contacto</li>
                          <li>Determina si el caso o proyecto se ajusta a la especialización del profesional</li>
                          <li>Recopila información preliminar para agilizar la primera consulta</li>
                        </ul>
                        
                        <h4>Programación Eficiente de Citas</h4>
                        <ul>
                          <li>Gestiona la agenda y disponibilidad para consultas iniciales</li>
                          <li>Reduce las llamadas telefónicas para programar reuniones</li>
                          <li>Envía recordatorios automáticos para reducir las cancelaciones</li>
                        </ul>
                        
                        <h4>Educación Preliminar del Cliente</h4>
                        <ul>
                          <li>Proporciona información básica sobre procesos y servicios</li>
                          <li>Responde preguntas frecuentes sobre tarifas, plazos y metodologías</li>
                          <li>Prepara al cliente para una interacción más productiva con el profesional</li>
                        </ul>
                        
                        <h4>Gestión de Expectativas</h4>
                        <ul>
                          <li>Comunica claramente los alcances y límites de los servicios ofrecidos</li>
                          <li>Explica los procesos habituales y tiempos estimados</li>
                          <li>Evita malentendidos que pueden afectar la relación profesional</li>
                        </ul>
                        
                        <h4>Marketing de Contenidos Interactivo y Datos Analíticos</h4>
                        <ul>
                          <li>Presenta información valiosa de manera conversacional</li>
                          <li>Demuestra experiencia y conocimiento en tu campo específico</li>
                          <li>Genera confianza antes del contacto personal</li>
                          <li>Proporciona estadísticas exclusivas de tu práctica profesional</li>
                          <li>Métricas aisladas por cuenta, garantizando la privacidad de tus datos</li>
                        </ul>
                        
                        <h3>Testimonios</h3>
                        <blockquote>
                          "Como bufete especializado, solíamos perder mucho tiempo con consultas que no encajaban 
                          con nuestra práctica. AIPI no solo filtra estas consultas, sino que deriva a los 
                          potenciales clientes al abogado adecuado dentro de nuestra firma, basándose en sus 
                          necesidades específicas. Nuestra productividad ha aumentado significativamente."
                          <cite>— Socio Director, Asesoría Legal Global</cite>
                        </blockquote>
                        
                        <div className="mt-8">
                          <Button size="lg" asChild>
                            <Link href="/get-started">Integrar en Mi Práctica Profesional</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "implementation" && (
                  <div id="implementation" className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Code className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Implementación Simple</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          La implementación de AIPI ha sido diseñada para ser extremadamente sencilla, 
                          sin necesidad de conocimientos técnicos avanzados. En pocos pasos, podrás tener 
                          funcionando un asistente virtual inteligente en tu sitio web.
                        </p>
                        
                        <h3>Proceso de Implementación</h3>
                        
                        <h4>Paso 1: Integración con tu Sitio Web</h4>
                        <p>
                          Simplemente agrega un fragmento de código HTML a tu sitio web, justo antes de la etiqueta 
                          de cierre &lt;/body&gt;. Tenemos opciones para:
                        </p>
                        <ul>
                          <li>Widget flotante (burbuja) que aparece en una esquina de tu sitio</li>
                          <li>Experiencia de pantalla completa estilo ChatGPT</li>
                        </ul>
                        <p>
                          Si utilizas WordPress, puedes agregar el código en el tema (footer.php) o utilizar un plugin 
                          que permita insertar código HTML.
                        </p>
                        
                        <h4>Paso 2: Personalización del Asistente</h4>
                        <p>
                          Desde tu panel de control de AIPI, podrás personalizar múltiples aspectos:
                        </p>
                        <ul>
                          <li>Colores y estilo visual para que coincida con tu marca</li>
                          <li>Posición en la pantalla (para el widget flotante)</li>
                          <li>Mensaje de bienvenida y comportamiento inicial</li>
                          <li>Idiomas soportados</li>
                          <li>Nombre y "personalidad" del asistente</li>
                        </ul>
                        
                        <h4>Paso 3: Entrenamiento del Asistente</h4>
                        <p>
                          Para que tu asistente proporcione respuestas útiles y relevantes:
                        </p>
                        <ul>
                          <li>Sube documentos PDF con información sobre tus servicios o programas</li>
                          <li>Agrega archivos DOCX con preguntas frecuentes y sus respuestas</li>
                          <li>Incluye hojas de cálculo Excel con datos estructurados</li>
                          <li>Escribe instrucciones específicas sobre el tono y estilo de las respuestas</li>
                        </ul>
                        <p>
                          También puedes indicar URLs específicas de tu sitio para que el asistente 
                          extraiga y aprenda de ese contenido automáticamente.
                        </p>
                        
                        <h4>Paso 4: Activación y Monitoreo Personalizado</h4>
                        <p>
                          Una vez configurado, el asistente estará listo para interactuar con tus visitantes. 
                          Desde tu panel de control particular podrás:
                        </p>
                        <ul>
                          <li>Monitorear conversaciones en tiempo real solo de tus integraciones</li>
                          <li>Revisar métricas de uso y efectividad exclusivas de tu cuenta</li>
                          <li>Acceder a leads capturados en tu sitio web</li>
                          <li>Refinar el entrenamiento basado en interacciones reales con tus visitantes</li>
                          <li>Obtener estadísticas completamente aisladas de otros usuarios del sistema</li>
                        </ul>
                        
                        <h3>Requisitos Técnicos</h3>
                        <p>
                          AIPI está diseñado para funcionar con prácticamente cualquier sitio web moderno:
                        </p>
                        <ul>
                          <li>Compatible con todos los CMS populares (WordPress, Drupal, Joomla, etc.)</li>
                          <li>Funciona con sitios estáticos HTML</li>
                          <li>Se integra con aplicaciones JavaScript (React, Angular, Vue, etc.)</li>
                          <li>No requiere modificaciones al servidor</li>
                        </ul>
                        
                        <div className="mt-8">
                          <Button size="lg" asChild>
                            <Link href="/get-started">Comenzar Implementación</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}