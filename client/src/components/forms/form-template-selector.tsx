import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ArrowRight, FileText, Users, BarChart4, Eye, X, ClipboardList, Star, User, ShoppingCart, MessageSquare, Briefcase, Bell, Mail } from "lucide-react";

type FormTemplate = {
  id: number;
  name: string;
  description: string;
  type: string;
  thumbnail?: string;
  structure: any;
  styling?: any;
  settings?: any;
  is_default: boolean;
};

const iconMap = {
  contact: <FileText className="w-8 h-8 mb-2 text-primary" />,
  waitlist: <Users className="w-8 h-8 mb-2 text-primary" />,
  survey: <BarChart4 className="w-8 h-8 mb-2 text-primary" />,
};

export function FormTemplateSelector() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch available templates
  const { data: templates, isLoading } = useQuery<FormTemplate[]>({
    queryKey: ['/api/form-templates'],
  });

  // Create new form based on template
  const createFormMutation = useMutation({
    mutationFn: async (templateId: number) => {
      return await apiRequest('POST', '/api/forms', { templateId });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/forms'] });
      toast({
        title: "Formulario creado",
        description: "Se ha creado un nuevo formulario basado en la plantilla seleccionada.",
      });
      // Redireccionar a dashboard con la pestaña forms activada
      setLocation(`/dashboard?tab=forms`);
      toast({
        title: "¡Formulario listo para editar!",
        description: "Puedes encontrar tu nuevo formulario en la lista de formularios",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `No se pudo crear el formulario: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateForm = () => {
    if (selectedTemplate) {
      createFormMutation.mutate(selectedTemplate);
    } else {
      toast({
        title: "Selección requerida",
        description: "Por favor, selecciona una plantilla para continuar.",
        variant: "destructive",
      });
    }
  };

  const handleCreateBlankForm = () => {
    // También redirigir al dashboard con un mensaje
    toast({
      title: "Función en desarrollo",
      description: "La creación de formularios desde cero estará disponible próximamente",
    });
    setLocation('/dashboard?tab=forms');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Selecciona una plantilla</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="cursor-pointer hover:border-primary/50">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Selecciona una plantilla</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Pasa el cursor sobre la plantilla y haz clic en el ícono del <Eye className="w-3 h-3 inline mx-1" /> para previsualizarla antes de usar.
          </p>
        </div>
        <Button variant="outline" onClick={handleCreateBlankForm}>
          Crear desde cero
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id 
                ? "border-2 border-primary ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10" 
                : "hover:border-primary/30"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                {template.name}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="w-full aspect-video bg-slate-100 dark:bg-gray-800 rounded-md mb-3 overflow-hidden relative group">
                {/* Botón de vista previa */}
                <button 
                  className="absolute right-2 top-2 bg-primary/90 text-white p-1.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(template);
                    setShowPreview(true);
                  }}
                  title="Vista previa"
                >
                  <Eye className="h-4 w-4" />
                </button>
                
                {/* Miniatura de ejemplo - normalmente sería una imagen real almacenada en el servidor */}
                <div className={`w-full h-full flex flex-col p-4 border ${
                  selectedTemplate === template.id ? "border-primary" : "border-gray-200 dark:border-gray-700"
                } rounded-md`}>
                  {/* Encabezado del formulario de muestra */}
                  <div className="w-full mb-3">
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  {/* Simulación de campos según el tipo de formulario */}
                  <div className="space-y-2 w-full">
                    {template.type === 'contact' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {template.type === 'waitlist' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="flex space-x-2">
                            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {template.type === 'survey' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div key={n} className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {template.type === 'lead' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {template.type === 'registration' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded mt-3"></div>
                      </>
                    )}
                    
                    {template.type === 'order' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex flex-col space-y-1 w-2/3">
                            <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                          <div className="flex flex-col space-y-1 w-1/3">
                            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                        <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded mt-3"></div>
                      </>
                    )}
                    
                    {template.type === 'feedback' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div key={n} className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="flex space-x-1">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="flex items-center space-x-1">
                                <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {template.type === 'application' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-sm mt-2 mx-auto"></div>
                      </>
                    )}
                    
                    {template.type === 'subscription' && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mt-2 mx-auto"></div>
                      </>
                    )}
                    
                    {/* Fallback para otros tipos */}
                    {!['contact', 'waitlist', 'survey', 'lead', 'registration', 'order', 'feedback', 'application', 'subscription'].includes(template.type) && (
                      <>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Botón de muestra */}
                  <div className="mt-auto pt-3">
                    <div className="h-7 w-1/3 bg-primary/30 rounded-sm mx-auto"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-center text-muted-foreground">
                {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
              </p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-3">
              <Button 
                variant={selectedTemplate === template.id ? "default" : "ghost"}
                className={`w-full text-xs justify-between ${selectedTemplate === template.id ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10 hover:text-primary"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTemplate(template.id);
                  createFormMutation.mutate(template.id);
                }}
              >
                <span>{selectedTemplate === template.id ? "Crear con esta plantilla" : "Usar esta plantilla"}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de Vista Previa */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {previewTemplate?.name || "Vista previa de la plantilla"}
            </DialogTitle>
            <DialogDescription>
              {previewTemplate?.description || "Vista previa detallada de los campos y estructura del formulario."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-white dark:bg-slate-900 border rounded-lg p-6 max-h-[70vh] overflow-y-auto">
            {previewTemplate && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">{previewTemplate.name}</h2>
                  <p className="text-muted-foreground">{previewTemplate.description}</p>
                </div>
                
                {/* Aquí renderizamos una versión más detallada del formulario según el tipo */}
                {previewTemplate.type === 'contact' && (
                  <div className="max-w-2xl mx-auto space-y-5 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-sm">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre<span className="text-blue-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email<span className="text-blue-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Asunto</label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje<span className="text-blue-500 ml-1">*</span></label>
                      <div className="h-36 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    <div className="pt-6">
                      <div className="h-12 w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'waitlist' && (
                  <div className="max-w-2xl mx-auto space-y-5 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20 p-8 rounded-xl shadow-sm">
                    <div className="text-center mb-6">
                      <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre completo<span className="text-purple-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-full border-0 shadow-sm"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email<span className="text-purple-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-full border-0 shadow-sm"></div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 bg-white dark:bg-gray-800 rounded-md border border-purple-300 dark:border-purple-700 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-sm bg-purple-500 opacity-0"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Quiero recibir actualizaciones por email</span>
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="h-12 w-full md:w-2/3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-md mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'survey' && (
                  <div className="max-w-2xl mx-auto space-y-7 bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-teal-900/20 p-8 rounded-xl shadow-sm">
                    <div className="space-y-4">
                      <label className="text-base font-medium text-gray-800 dark:text-gray-200">¿Cómo calificaría nuestro servicio?<span className="text-teal-500 ml-1">*</span></label>
                      <div className="flex justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className="flex flex-col items-center">
                            <div className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                              <div className="h-6 w-6 rounded-full bg-teal-500 opacity-0"></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">{n}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Qué aspectos podríamos mejorar?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Atención', 'Producto', 'Precios', 'Soporte'].map((option) => (
                          <div key={option} className="h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center px-3">
                            <div className="h-4 w-4 rounded-full border border-teal-500 mr-2"></div>
                            <span className="text-xs text-gray-500">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comentarios adicionales</label>
                      <div className="h-24 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="pt-6">
                      <div className="h-12 w-full md:w-1/3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg shadow-md mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'lead' && (
                  <div className="max-w-2xl mx-auto space-y-5 bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-900/10 p-8 rounded-xl shadow-sm">
                    <div className="text-center mb-6">
                      <div className="inline-block p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl mb-2">
                        <div className="w-14 h-2 bg-orange-400 dark:bg-orange-500 rounded-full mb-2"></div>
                        <div className="w-10 h-2 bg-orange-300 dark:bg-orange-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre<span className="text-orange-500 ml-1">*</span></label>
                        <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Apellido<span className="text-orange-500 ml-1">*</span></label>
                        <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email de trabajo<span className="text-orange-500 ml-1">*</span></label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Empresa<span className="text-orange-500 ml-1">*</span></label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Qué servicio te interesa?</label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="pt-4 flex justify-center">
                      <div className="h-12 w-full sm:w-2/3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-md shadow-md"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'registration' && (
                  <div className="max-w-2xl mx-auto space-y-6 bg-gradient-to-br from-white to-sky-50 dark:from-gray-900 dark:to-sky-900/10 p-8 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="h-2 w-24 bg-sky-500 rounded-full"></div>
                      <div className="h-2 w-24 bg-sky-200 dark:bg-sky-800 rounded-full"></div>
                      <div className="h-2 w-24 bg-sky-200 dark:bg-sky-800 rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre<span className="text-sky-500 ml-1">*</span></label>
                        <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Apellido<span className="text-sky-500 ml-1">*</span></label>
                        <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email<span className="text-sky-500 ml-1">*</span></label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Cómo supiste del evento?</label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-md border-0 shadow-sm relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-r-2 border-b-2 border-gray-400 rotate-45"></div>
                      </div>
                    </div>
                    
                    <div className="pt-5">
                      <div className="h-12 w-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-md shadow-md"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'order' && (
                  <div className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4 border-b pb-4 border-gray-100 dark:border-gray-800">
                      <div>
                        <div className="h-6 w-32 bg-gray-900 dark:bg-white rounded-md"></div>
                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-black dark:bg-white"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Producto<span className="text-red-500 ml-1">*</span></label>
                        <div className="h-14 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                          <div className="absolute left-14 top-1/2 transform -translate-y-1/2">
                            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad<span className="text-red-500 ml-1">*</span></label>
                          <div className="h-11 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de entrega</label>
                          <div className="h-11 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Instrucciones especiales</label>
                        <div className="h-20 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"></div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="h-12 w-full bg-black dark:bg-white rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'feedback' && (
                  <div className="max-w-2xl mx-auto space-y-8 bg-gradient-to-br from-white to-rose-50 dark:from-gray-900 dark:to-rose-900/10 p-8 rounded-xl shadow-sm">
                    <div className="text-center mb-2">
                      <div className="inline-flex mb-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className="h-8 w-8 text-rose-500 mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Qué le pareció nuestro servicio?<span className="text-rose-500 ml-1">*</span></label>
                      <div className="flex space-x-2">
                        {['Excelente', 'Bueno', 'Regular', 'Malo', 'Muy malo'].map((option) => (
                          <div key={option} className="flex-1 h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-500">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Recomendaría nuestro servicio a un amigo?<span className="text-rose-500 ml-1">*</span></label>
                      <div className="h-11 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comentarios adicionales</label>
                      <div className="h-28 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="h-12 w-full md:w-1/2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg shadow-md mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'application' && (
                  <div className="max-w-2xl mx-auto space-y-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-slate-800 p-8 rounded-xl shadow-md">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="h-6 w-48 bg-gray-900 dark:bg-white rounded"></div>
                          <div className="h-3 w-36 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-gray-900 dark:bg-white"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre<span className="text-gray-900 dark:text-white ml-1">*</span></label>
                        <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"></div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Apellido<span className="text-gray-900 dark:text-white ml-1">*</span></label>
                        <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email<span className="text-gray-900 dark:text-white ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn o sitio web<span className="text-gray-900 dark:text-white ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sube tu CV<span className="text-gray-900 dark:text-white ml-1">*</span></label>
                      <div className="h-24 w-full bg-white dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-10 w-10 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <div className="h-5 w-5 bg-gray-400 dark:bg-gray-500 rounded"></div>
                          </div>
                          <div className="h-2 w-24 bg-gray-200 dark:bg-gray-600 rounded mt-2 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="h-12 w-full bg-gray-900 dark:bg-white rounded-md"></div>
                    </div>
                  </div>
                )}
                
                {previewTemplate.type === 'subscription' && (
                  <div className="max-w-2xl mx-auto space-y-5 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900/10 p-8 rounded-xl shadow-sm">
                    <div className="text-center mb-6">
                      <div className="inline-block p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre<span className="text-green-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email<span className="text-green-500 ml-1">*</span></label>
                      <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg border-0 shadow-sm"></div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencia de envío</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Diario', 'Semanal', 'Mensual'].map((option) => (
                          <div key={option} className="h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                            <span className="text-xs">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 bg-white dark:bg-gray-800 rounded-md border border-green-300 dark:border-green-700 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-sm bg-green-500 opacity-0"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Acepto recibir comunicaciones por email</span>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <div className="h-12 w-full md:w-1/2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {/* Formulario genérico para otros tipos */}
                {!['contact', 'waitlist', 'survey', 'lead', 'registration', 'order', 'feedback', 'application', 'subscription'].includes(previewTemplate.type) && (
                  <div className="max-w-2xl mx-auto space-y-5 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre <span className="text-red-500">*</span></label>
                      <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded-md border"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                      <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded-md border"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mensaje</label>
                      <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-md border"></div>
                    </div>
                    <div className="pt-4">
                      <div className="h-10 w-full md:w-1/3 bg-primary/80 rounded-md mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cerrar vista previa</Button>
            </DialogClose>
            
            <Button
              disabled={!previewTemplate || createFormMutation.isPending}
              onClick={() => {
                if (previewTemplate) {
                  setSelectedTemplate(previewTemplate.id);
                  createFormMutation.mutate(previewTemplate.id);
                  setShowPreview(false);
                }
              }}
            >
              {createFormMutation.isPending ? "Creando..." : "Usar esta plantilla"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleCreateForm}
          disabled={!selectedTemplate || createFormMutation.isPending}
        >
          {createFormMutation.isPending ? "Creando..." : "Continuar"}
        </Button>
      </div>
    </div>
  );
}