import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function GoogleCalendarInstructions() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [useCustomUrl, setUseCustomUrl] = useState(false);
  const [lastUsedUrl, setLastUsedUrl] = useState<string>("");
  const [showUrlComparison, setShowUrlComparison] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Obtener la URL de redirección actual del servidor
        const response = await fetch('/api/debug/environment', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Error al obtener información del entorno");
        }
        
        const data = await response.json();
        // Usar la URL de redirección correcta
        console.log("URL de redirección detectada:", data.redirectUrl.google);
        setRedirectUrl(data.redirectUrl.google);
        
        // Comprobar si hay una URL de autenticación guardada en localStorage
        const savedAuthUrl = localStorage.getItem("googleAuthUrl");
        if (savedAuthUrl) {
          setAuthUrl(savedAuthUrl);
          // Limpiar después de obtenerla
          localStorage.removeItem("googleAuthUrl");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Instrucciones para configurar Google Calendar</h1>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error de redirección</AlertTitle>
        <AlertDescription>
          Se ha detectado un error de coincidencia en la URL de redirección (redirect_uri_mismatch).
          Siga las instrucciones a continuación para resolverlo.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuración de la consola de Google Cloud</CardTitle>
          <CardDescription>
            Para permitir la conexión con Google Calendar, debe agregar la siguiente URL a las URLs de redirección autorizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" 
                   aria-label="Cargando" />
              <span className="ml-3">Obteniendo URL de redirección...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="useCustomUrl" 
                  checked={useCustomUrl} 
                  onCheckedChange={(checked) => setUseCustomUrl(checked === true)}
                />
                <label htmlFor="useCustomUrl" className="text-sm font-medium">
                  Usar URL personalizada para la redirección
                </label>
              </div>
              
              {useCustomUrl ? (
                <div className="space-y-2">
                  <div className="flex">
                    <Input 
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://midominiopersonalizado.com/api/auth/google-calendar/callback"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(customUrl);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="ml-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ingrese la URL completa que utilizará en su entorno de producción. 
                    Esta URL debe terminar con "/api/auth/google-calendar/callback" y debe ser 
                    <strong>exactamente igual</strong> a la configurada en la Consola de Google Cloud.
                  </p>
                  <div className="bg-yellow-50 text-amber-800 p-3 text-xs rounded border border-amber-200 mt-2">
                    <p className="font-bold">Nota importante:</p>
                    <p>Para evitar el error "redirect_uri_mismatch", debe copiar exactamente esta URL en Google Cloud Console. Asegúrese que no haya diferencias en:</p>
                    <ul className="list-disc ml-4 mt-1 space-y-1">
                      <li>Protocolo (https:// vs http://)</li>
                      <li>Subdominios (incluyendo los IDs de Replit)</li>
                      <li>La ruta completa (/api/auth/google-calendar/callback)</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-md flex justify-between items-center">
                  <code className="text-sm font-mono break-all">{redirectUrl}</code>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="ml-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <h3 className="font-semibold text-lg mt-4">Pasos a seguir:</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Vaya a la <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary underline">Consola de Google Cloud - Credenciales</a></li>
            <li>Seleccione su proyecto</li>
            <li>Busque la sección "IDs de cliente OAuth 2.0" y haga clic en el ID de cliente que está utilizando</li>
            <li>En "URI de redirección autorizados" agregue la URL mostrada arriba</li>
            <li>Guarde los cambios haciendo clic en "Guardar"</li>
            <li>Espere unos minutos para que la configuración se propague</li>
            <li>Regrese a la aplicación e intente conectar Google Calendar nuevamente</li>
          </ol>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Diagnóstico del error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            El error "redirect_uri_mismatch" ocurre porque Google Cloud requiere que todas las URLs de redirección
            estén explícitamente autorizadas por motivos de seguridad. La URL que está intentando usar no coincide
            con ninguna de las URLs configuradas en su consola de Google Cloud.
          </p>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowUrlComparison(!showUrlComparison)}
              className="mb-2"
            >
              {showUrlComparison ? "Ocultar detalles técnicos" : "Mostrar detalles técnicos"}
            </Button>
            
            {showUrlComparison && (
              <div className="bg-muted p-4 rounded-md mt-2 text-sm">
                <h4 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Diagnóstico de error redirect_uri_mismatch
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">URL configurada en Google Cloud (debe verificar):</div>
                    <div className="bg-gray-100 p-2 rounded border font-mono text-xs break-all">
                      https://...your-configured-url.../api/auth/google-calendar/callback
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium">URL actual que se está usando:</div>
                    <div className="bg-gray-100 p-2 rounded border font-mono text-xs break-all">
                      {useCustomUrl ? customUrl : redirectUrl}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded border border-amber-200 text-xs">
                    <p>La solución es asegurarse de que las URL sean <strong>exactamente iguales</strong>, con:</p>
                    <ul className="list-disc ml-4 mt-1">
                      <li>El mismo protocolo (https:// o http://)</li>
                      <li>El mismo dominio y subdominio completo</li>
                      <li>La misma ruta (/api/auth/google-calendar/callback)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <p className="mt-4">
            Una vez que agregue la URL correcta a la lista de redirecciones autorizadas, la autenticación debería
            funcionar correctamente.
          </p>
          
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Continuar con la autorización</h3>
            <p className="mb-4">Después de actualizar las URLs de redirección en Google Cloud, puede continuar con el proceso de autorización:</p>
            
            {authUrl ? (
              <Button 
                onClick={() => window.location.href = authUrl}
                className="w-full"
              >
                Continuar con la autorización de Google Calendar
              </Button>
            ) : (
              <Button 
                onClick={async () => {
                  try {
                    setLoading(true);
                    const response = await fetch(`/api/auth/google-calendar-url${useCustomUrl ? `?customRedirectUrl=${encodeURIComponent(customUrl)}` : ''}`, {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                      }
                    });
                    
                    if (!response.ok) {
                      throw new Error("Error al obtener URL de autenticación");
                    }
                    
                    const data = await response.json();
                    window.location.href = data.authUrl;
                  } catch (error) {
                    console.error("Error al iniciar la autenticación:", error);
                    alert("Error al obtener URL de autenticación. Por favor, intente nuevamente.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full"
                disabled={useCustomUrl && !customUrl.trim()}
              >
                Obtener URL de autorización de Google Calendar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}