import React, { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, ArrowLeft, Eye, Settings, Code, Layout, ArrowUp, ArrowDown, Share2 } from 'lucide-react';
import Header from '@/components/header';

// Tipos para el formulario
interface FieldOption {
  label: string;
  value?: string;
}

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  options?: (string | FieldOption)[];
  defaultValue?: string;
}

interface FormStructure {
  fields: FormField[];
  submitButtonText: string;
}

interface FormStyling {
  theme: 'light' | 'dark' | 'auto';
  fontFamily: string;
  primaryColor: string;
  borderRadius: string;
  spacing: string;
}

interface FormSettings {
  redirectUrl: string;
  sendEmailNotification: boolean;
  emailRecipients: string;
  successMessage: string;
  captcha: boolean;
  storeResponses: boolean;
}

interface FormData {
  title: string;
  description: string;
  slug: string;
  type: string;
  published: boolean;
  structure: FormStructure;
  styling: FormStyling;
  settings: FormSettings;
}

interface FieldData {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  options: (string | FieldOption)[];
  defaultValue: string;
}

const FormEditor = () => {
  const [, navigate] = useLocation();
  const [match, params] = useRoute<{ id: string }>('/forms/:id/edit');
  const formId = parseInt(params?.id || '0');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    slug: '',
    type: 'contact',
    published: true,
    structure: {
      fields: [],
      submitButtonText: 'Enviar'
    },
    styling: {
      theme: 'light',
      fontFamily: 'Inter',
      primaryColor: '#3B82F6',
      borderRadius: 'md',
      spacing: 'md'
    },
    settings: {
      redirectUrl: '',
      sendEmailNotification: false,
      emailRecipients: '',
      successMessage: 'Gracias por tu envío',
      captcha: false,
      storeResponses: true
    }
  });
  
  // Estado para el modal de edición de campos
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(-1);
  const [fieldData, setFieldData] = useState<FieldData>({
    label: '',
    name: '',
    type: 'text',
    placeholder: '',
    required: false,
    options: [],
    defaultValue: ''
  });
  
  // Obtener datos del formulario
  const { data: form, isLoading, isError } = useQuery<FormData>({
    queryKey: [`/api/forms/${formId}`],
    enabled: !!formId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Actualizar formulario
  const updateFormMutation = useMutation({
    mutationFn: (data: any) => {
      // Usar apiRequest de queryClient que ya maneja la autenticación correctamente
      return apiRequest('PUT', `/api/forms/${formId}`, data)
        .then(res => {
          if (!res.ok) throw new Error('Error al actualizar el formulario');
          return res.json();
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/forms/${formId}`] });
      toast({
        title: 'Formulario actualizado',
        description: 'Los cambios han sido guardados correctamente'
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el formulario',
        variant: 'destructive'
      });
    }
  });

  // Helper para convertir la respuesta de la API en un objeto con los tipos correctos
  const parseFormData = (apiForm: any): FormData => {
    return {
      title: apiForm?.title || '',
      description: apiForm?.description || '',
      slug: apiForm?.slug || '',
      type: apiForm?.type || 'contact',
      published: apiForm?.published || false,
      structure: apiForm?.structure || { fields: [], submitButtonText: 'Enviar' },
      styling: {
        theme: (apiForm?.styling?.theme as FormStyling['theme']) || 'light',
        fontFamily: apiForm?.styling?.fontFamily || 'Inter',
        primaryColor: apiForm?.styling?.primaryColor || '#3B82F6',
        borderRadius: apiForm?.styling?.borderRadius || 'md',
        spacing: apiForm?.styling?.spacing || 'md'
      },
      settings: {
        redirectUrl: apiForm?.settings?.redirectUrl || '',
        sendEmailNotification: apiForm?.settings?.sendEmailNotification || false,
        emailRecipients: apiForm?.settings?.emailRecipients || '',
        successMessage: apiForm?.settings?.successMessage || 'Gracias por tu envío',
        captcha: apiForm?.settings?.captcha || false,
        storeResponses: apiForm?.settings?.storeResponses || true
      }
    };
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (form) {
      setFormData(parseFormData(form));
    }
  }, [form]);

  // Guardar cambios
  const handleSaveForm = () => {
    console.log("Guardando formulario con datos:", formData);
    updateFormMutation.mutate(formData);
  };

  // Volver a la lista de formularios
  const handleBack = () => {
    navigate('/dashboard?tab=forms');
  };
  
  // Mover un campo hacia arriba (intercambiar con el anterior)
  const handleMoveFieldUp = (index: number) => {
    if (index <= 0) return; // No se puede mover el primer elemento hacia arriba
    
    const updatedFields = [...formData.structure.fields];
    // Intercambiar posiciones
    [updatedFields[index-1], updatedFields[index]] = [updatedFields[index], updatedFields[index-1]];
    
    // Crear un nuevo objeto con los datos actualizados
    const updatedFormData = {
      ...formData,
      structure: {
        ...formData.structure,
        fields: updatedFields
      }
    };
    
    // Actualizar el estado
    setFormData(updatedFormData);
    
    // Guardar automáticamente con los datos actualizados
    console.log("Guardando formulario automáticamente después de mover campo hacia arriba");
    updateFormMutation.mutate(updatedFormData);
    
    toast({
      title: "Campo reordenado",
      description: "El campo se ha movido hacia arriba"
    });
  };
  
  // Mover un campo hacia abajo (intercambiar con el siguiente)
  const handleMoveFieldDown = (index: number) => {
    if (index >= formData.structure.fields.length - 1) return; // No se puede mover el último elemento hacia abajo
    
    const updatedFields = [...formData.structure.fields];
    // Intercambiar posiciones
    [updatedFields[index], updatedFields[index+1]] = [updatedFields[index+1], updatedFields[index]];
    
    // Crear un nuevo objeto con los datos actualizados
    const updatedFormData = {
      ...formData,
      structure: {
        ...formData.structure,
        fields: updatedFields
      }
    };
    
    // Actualizar el estado
    setFormData(updatedFormData);
    
    // Guardar automáticamente con los datos actualizados
    console.log("Guardando formulario automáticamente después de mover campo hacia abajo");
    updateFormMutation.mutate(updatedFormData);
    
    toast({
      title: "Campo reordenado",
      description: "El campo se ha movido hacia abajo"
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando formulario...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>No se pudo cargar el formulario</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">El formulario solicitado no existe o no tienes permisos para acceder.</p>
              <Button onClick={handleBack} className="w-full">
                Volver a la lista de formularios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container max-w-7xl mx-auto py-6 space-y-6">
        {/* Barra de herramientas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold">{formData.title || 'Editor de Formulario'}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  // Guardar antes de previsualizar para asegurar que todos los cambios están aplicados
                  // Usar un enfoque basado en promesas para asegurar que la mutación se complete
                  try {
                    console.log("Guardando cambios antes de previsualizar");
                    await updateFormMutation.mutateAsync(formData);
                    console.log("Cambios guardados exitosamente, navegando a vista previa");
                    
                    // Invalidar la caché para forzar una recarga fresca en el componente de vista previa
                    queryClient.invalidateQueries({ queryKey: [`/api/forms/${formId}`] });
                    
                    // Navegar después de que la mutación se complete exitosamente
                    navigate(`/forms/${formId}`);
                  } catch (error) {
                    console.error("Error al guardar el formulario antes de previsualizar:", error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "No se pudieron guardar los cambios antes de previsualizar"
                    });
                  }
                }}
                disabled={updateFormMutation.isPending}
              >
                {updateFormMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Previsualizar
                  </>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={async () => {
                  try {
                    // Guardar primero
                    await updateFormMutation.mutateAsync(formData);
                    
                    // Abrir en una nueva pestaña
                    const url = `${window.location.origin}/forms/${formId}?t=${Date.now()}`;
                    window.open(url, '_blank');
                    
                    toast({
                      title: "Formulario guardado",
                      description: "Se ha abierto la vista previa en una nueva pestaña"
                    });
                  } catch (error) {
                    console.error("Error al guardar el formulario:", error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "No se pudo guardar el formulario"
                    });
                  }
                }}
                disabled={updateFormMutation.isPending}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Nueva pestaña
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={async () => {
                  try {
                    // Guardar primero
                    await updateFormMutation.mutateAsync(formData);
                    
                    // Navegar a la página de integración
                    navigate(`/forms/${formId}/integrate`);
                    
                    toast({
                      title: "Formulario guardado",
                      description: "Ahora puedes integrar tu formulario"
                    });
                  } catch (error) {
                    console.error("Error al guardar el formulario:", error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "No se pudo guardar el formulario"
                    });
                  }
                }}
                disabled={updateFormMutation.isPending}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Integrar
              </Button>
            </div>
            
            <Button
              size="sm"
              disabled={updateFormMutation.isPending}
              onClick={handleSaveForm}
            >
              {updateFormMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Pestañas de edición */}
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="content">
              <Layout className="h-4 w-4 mr-2" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Eye className="h-4 w-4 mr-2" />
              Apariencia
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Ajustes
            </TabsTrigger>
          </TabsList>
          
          {/* Pestaña de Contenido */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información básica</CardTitle>
                <CardDescription>
                  Configura los detalles básicos de tu formulario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del formulario</Label>
                    <Input 
                      id="title" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ej: Formulario de contacto"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Identificador único</Label>
                    <Input 
                      id="slug" 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value.replace(/\s+/g, '-').toLowerCase()})}
                      placeholder="identificador-unico"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description || ''} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Breve descripción de este formulario"
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="published" 
                    checked={formData.published} 
                    onCheckedChange={(checked) => setFormData({...formData, published: checked})}
                  />
                  <Label htmlFor="published">
                    {formData.published ? 'Formulario publicado' : 'Formulario en borrador'}
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de formulario</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contact">Contacto</SelectItem>
                      <SelectItem value="lead">Captura de Leads</SelectItem>
                      <SelectItem value="survey">Encuesta</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="registration">Registro</SelectItem>
                      <SelectItem value="waitlist">Lista de Espera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Campos del formulario</CardTitle>
                <CardDescription>
                  Configura los campos que se mostrarán en tu formulario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Lista de campos existentes */}
                  {formData.structure.fields.map((field, index) => (
                    <div key={index} className="p-4 border rounded-md bg-muted/20">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{field.label || 'Campo sin etiqueta'}</h4>
                          <p className="text-sm text-muted-foreground">
                            Tipo: {field.type === 'text' ? 'Texto' : 
                                  field.type === 'email' ? 'Correo electrónico' : 
                                  field.type === 'number' ? 'Número' : 
                                  field.type === 'textarea' ? 'Área de texto' : 
                                  field.type === 'select' ? 'Selección' : 
                                  field.type === 'checkbox' ? 'Casilla de verificación' : 
                                  field.type === 'radio' ? 'Opción única' : 
                                  'Otro'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Mover hacia arriba"
                            onClick={() => handleMoveFieldUp(index)}
                            disabled={index === 0} // Deshabilitar si es el primer elemento
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Mover hacia abajo"
                            onClick={() => handleMoveFieldDown(index)}
                            disabled={index === formData.structure.fields.length - 1} // Deshabilitar si es el último elemento
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // Editar campo existente
                              setCurrentEditingField(index);
                              setShowFieldModal(true);
                              setFieldData({
                                label: field.label || '',
                                name: field.name || '',
                                type: field.type || 'text',
                                placeholder: field.placeholder || '',
                                required: field.required || false,
                                options: field.options || [],
                                defaultValue: field.defaultValue || ''
                              });
                            }}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              // Eliminar campo
                              const updatedFields = [...formData.structure.fields];
                              updatedFields.splice(index, 1);
                              
                              // Crear un nuevo objeto con los datos actualizados
                              const updatedFormData = {
                                ...formData,
                                structure: {
                                  ...formData.structure,
                                  fields: updatedFields
                                }
                              };
                              
                              // Actualizar el estado
                              setFormData(updatedFormData);
                              
                              // Guardar automáticamente con los datos actualizados
                              console.log("Guardando formulario automáticamente después de eliminar campo");
                              setTimeout(() => {
                                updateFormMutation.mutate(updatedFormData);
                              }, 100);
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        {field.placeholder && (
                          <div>
                            <span className="text-muted-foreground">Placeholder:</span> {field.placeholder}
                          </div>
                        )}
                        {field.name && (
                          <div>
                            <span className="text-muted-foreground">Nombre:</span> {field.name}
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Requerido:</span> {field.required ? 'Sí' : 'No'}
                        </div>
                      </div>
                      
                      {field.options && field.options.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground">Opciones:</span>
                          <div className="grid grid-cols-2 gap-1 mt-1">
                            {field.options.map((option, i) => (
                              <div key={i} className="text-sm bg-muted/30 px-2 py-1 rounded">
                                {typeof option === 'object' && option.label ? option.label : String(option)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {formData.structure.fields.length === 0 && (
                    <div className="text-center p-8 border border-dashed rounded-md">
                      <p className="text-muted-foreground mb-4">
                        No hay campos configurados para este formulario.
                      </p>
                    </div>
                  )}
                  
                  {/* Botón para agregar nuevo campo */}
                  <Button 
                    onClick={() => {
                      // Agregar nuevo campo
                      setCurrentEditingField(-1);
                      setShowFieldModal(true);
                      console.log("Iniciando creación de un nuevo campo");
                      setFieldData({
                        label: '',
                        name: '',
                        type: 'text',
                        placeholder: '',
                        required: false,
                        options: [],
                        defaultValue: ''
                      });
                    }}
                    className="w-full"
                  >
                    Agregar campo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Modal para agregar/editar campos */}
            {showFieldModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>
                      {currentEditingField === -1 ? 'Agregar campo' : 'Editar campo'}
                    </CardTitle>
                    <CardDescription>
                      Configura las propiedades del campo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="field-label">Etiqueta</Label>
                      <Input 
                        id="field-label" 
                        value={fieldData.label} 
                        onChange={(e) => setFieldData({...fieldData, label: e.target.value})}
                        placeholder="Ej: Nombre completo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="field-name">Nombre técnico (ID)</Label>
                      <Input 
                        id="field-name" 
                        value={fieldData.name} 
                        onChange={(e) => setFieldData({...fieldData, name: e.target.value.replace(/\s+/g, '_').toLowerCase()})}
                        placeholder="Ej: nombre_completo"
                      />
                      <p className="text-xs text-muted-foreground">
                        Identificador único para el campo. Se genera automáticamente.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="field-type">Tipo de campo</Label>
                      <Select 
                        value={fieldData.type} 
                        onValueChange={(value) => setFieldData({...fieldData, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto corto</SelectItem>
                          <SelectItem value="textarea">Área de texto</SelectItem>
                          <SelectItem value="email">Correo electrónico</SelectItem>
                          <SelectItem value="number">Número</SelectItem>
                          <SelectItem value="tel">Teléfono</SelectItem>
                          <SelectItem value="select">Selección</SelectItem>
                          <SelectItem value="checkbox">Casilla de verificación</SelectItem>
                          <SelectItem value="radio">Opción única</SelectItem>
                          <SelectItem value="date">Fecha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(fieldData.type === 'text' || fieldData.type === 'textarea' || 
                     fieldData.type === 'email' || fieldData.type === 'tel' || 
                     fieldData.type === 'number' || fieldData.type === 'date') && (
                      <div className="space-y-2">
                        <Label htmlFor="field-placeholder">Texto de marcador</Label>
                        <Input 
                          id="field-placeholder" 
                          value={fieldData.placeholder} 
                          onChange={(e) => setFieldData({...fieldData, placeholder: e.target.value})}
                          placeholder="Ej: Escribe tu nombre completo"
                        />
                      </div>
                    )}
                    
                    {(fieldData.type === 'select' || fieldData.type === 'radio') && (
                      <div className="space-y-2">
                        <Label htmlFor="field-options">Opciones</Label>
                        <div className="space-y-2">
                          {fieldData.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input 
                                value={typeof option === 'string' ? option : option.label || ''} 
                                onChange={(e) => {
                                  const newOptions = [...fieldData.options];
                                  if (typeof option === 'string') {
                                    newOptions[index] = e.target.value;
                                  } else {
                                    newOptions[index] = { ...option, label: e.target.value };
                                  }
                                  setFieldData({...fieldData, options: newOptions});
                                }}
                                placeholder={`Opción ${index + 1}`}
                              />
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => {
                                  const newOptions = [...fieldData.options];
                                  newOptions.splice(index, 1);
                                  setFieldData({...fieldData, options: newOptions});
                                }}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setFieldData({
                                ...fieldData, 
                                options: [...fieldData.options, '']
                              });
                            }}
                          >
                            Agregar opción
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="field-required" 
                        checked={fieldData.required} 
                        onCheckedChange={(checked) => setFieldData({...fieldData, required: checked})}
                      />
                      <Label htmlFor="field-required">
                        Campo obligatorio
                      </Label>
                    </div>
                  </CardContent>
                  <div className="flex justify-end space-x-2 p-6 border-t">
                    <Button 
                      variant="outline"
                      onClick={() => setShowFieldModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        // Si el nombre está vacío, generarlo a partir de la etiqueta
                        const fieldName = fieldData.name || 
                                         fieldData.label.toLowerCase().replace(/\s+/g, '_');
                        
                        const newField = {
                          label: fieldData.label,
                          name: fieldName,
                          type: fieldData.type,
                          placeholder: fieldData.placeholder,
                          required: fieldData.required,
                          options: fieldData.type === 'select' || fieldData.type === 'radio' ? 
                                  fieldData.options : undefined,
                          defaultValue: fieldData.defaultValue
                        };
                        
                        if (currentEditingField === -1) {
                          // Agregar nuevo campo
                          console.log("Añadiendo nuevo campo al formulario:", newField);
                          // Crear un nuevo objeto con los datos actualizados
                          const updatedFormData = {
                            ...formData,
                            structure: {
                              ...formData.structure,
                              fields: [...formData.structure.fields, newField]
                            }
                          };
                          
                          // Actualizar el estado
                          setFormData(updatedFormData);
                          console.log("Estructura del formulario después de añadir:", updatedFormData);
                          
                          // Cerrar modal
                          setShowFieldModal(false);
                          
                          // Guardar automáticamente con los datos actualizados
                          console.log("Guardando formulario automáticamente después de añadir campo");
                          updateFormMutation.mutate(updatedFormData);
                        } else {
                          // Actualizar campo existente
                          const updatedFields = [...formData.structure.fields];
                          updatedFields[currentEditingField] = newField;
                          
                          // Crear un nuevo objeto con los datos actualizados
                          const updatedFormData = {
                            ...formData,
                            structure: {
                              ...formData.structure,
                              fields: updatedFields
                            }
                          };
                          
                          // Actualizar el estado
                          setFormData(updatedFormData);
                          
                          // Cerrar modal
                          setShowFieldModal(false);
                          
                          // Guardar automáticamente con los datos actualizados
                          console.log("Guardando formulario automáticamente después de editar campo");
                          updateFormMutation.mutate(updatedFormData);
                        }
                      }}
                    >
                      {currentEditingField === -1 ? 'Agregar' : 'Guardar cambios'}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>
          
          {/* Pestaña de Apariencia */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estilo visual</CardTitle>
                <CardDescription>
                  Personaliza la apariencia de tu formulario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select 
                    value={formData.styling?.theme || 'light'} 
                    onValueChange={(value: 'light' | 'dark' | 'auto') => setFormData({
                      ...formData, 
                      styling: {...formData.styling, theme: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="auto">Auto (según usuario)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Color principal</Label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="color" 
                      id="primaryColor" 
                      value={formData.styling?.primaryColor || '#3B82F6'} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        styling: {...formData.styling, primaryColor: e.target.value}
                      })}
                      className="h-10 w-10 rounded border border-input"
                    />
                    <Input 
                      value={formData.styling?.primaryColor || '#3B82F6'} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        styling: {...formData.styling, primaryColor: e.target.value}
                      })}
                      className="w-32"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Tipografía</Label>
                  <Select 
                    value={formData.styling?.fontFamily || 'Inter'} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      styling: {...formData.styling, fontFamily: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una tipografía" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Radio de bordes</Label>
                  <Select 
                    value={formData.styling?.borderRadius || 'md'} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      styling: {...formData.styling, borderRadius: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un radio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Ninguno</SelectItem>
                      <SelectItem value="sm">Pequeño</SelectItem>
                      <SelectItem value="md">Mediano</SelectItem>
                      <SelectItem value="lg">Grande</SelectItem>
                      <SelectItem value="full">Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Ajustes */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Ajustes avanzados del formulario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="successMessage">Mensaje de éxito</Label>
                  <Textarea 
                    id="successMessage" 
                    value={formData.settings?.successMessage || 'Gracias por tu envío'} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      settings: {...formData.settings, successMessage: e.target.value}
                    })}
                    placeholder="Mensaje que se mostrará después de un envío exitoso"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="redirectUrl">URL de redirección (opcional)</Label>
                  <Input 
                    id="redirectUrl" 
                    value={formData.settings?.redirectUrl || ''} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      settings: {...formData.settings, redirectUrl: e.target.value}
                    })}
                    placeholder="https://ejemplo.com/gracias"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="captcha" 
                    checked={formData.settings?.captcha || false} 
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      settings: {...formData.settings, captcha: checked}
                    })}
                  />
                  <Label htmlFor="captcha">
                    Habilitar CAPTCHA para prevenir spam
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="storeResponses" 
                    checked={formData.settings?.storeResponses !== false} 
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      settings: {...formData.settings, storeResponses: checked}
                    })}
                  />
                  <Label htmlFor="storeResponses">
                    Almacenar respuestas en la plataforma
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="sendEmailNotification" 
                    checked={formData.settings?.sendEmailNotification || false} 
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      settings: {...formData.settings, sendEmailNotification: checked}
                    })}
                  />
                  <Label htmlFor="sendEmailNotification">
                    Recibir notificaciones por correo electrónico
                  </Label>
                </div>
                
                {formData.settings?.sendEmailNotification && (
                  <div className="space-y-2">
                    <Label htmlFor="emailRecipients">Destinatarios de correo</Label>
                    <Input 
                      id="emailRecipients" 
                      value={formData.settings.emailRecipients || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        settings: {...formData.settings, emailRecipients: e.target.value}
                      })}
                      placeholder="email@ejemplo.com, otro@ejemplo.com"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          

        </Tabs>
      </div>
    </div>
  );
};

export default FormEditor;