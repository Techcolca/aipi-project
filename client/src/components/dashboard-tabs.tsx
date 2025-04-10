import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationCard } from "./integration-card";
import { Link } from "wouter";

// Definición de tipos
interface Integration {
  id: number;
  name: string;
  url: string;
  type: string;
  apiKey: string;
  userId: number;
  createdAt: string;
  status: string;
  visitorCount: number;
  description?: string;
}

export default function DashboardTabs() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("integrations");
  
  // Consulta para obtener las integraciones
  const { data: integrations, isLoading: isLoadingIntegrations } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
  });

  // Renderizar contenido de la pestaña de integraciones
  const renderIntegrationsTab = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Website Integrations</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage website integrations for AIPI.
            </p>
          </div>
          <Button onClick={() => navigate("/create-integration")}>
            Create Integration
          </Button>
        </div>

        {isLoadingIntegrations ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : integrations && integrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        ) : (
          <>
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">No integrations yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add a new website integration to connect AIPI with your site
              </p>
              <Button variant="default" className="w-full sm:w-auto px-8" onClick={() => navigate("/create-integration")}>
                Create Integration
              </Button>
            </Card>
          </>
        )}
      </div>
    );
  };

  // Consulta para obtener la configuración
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["/api/settings"],
  });

  // Renderizar contenido de la pestaña de configuración
  const renderSettingsTab = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Configure your AIPI assistant settings.</p>
        
        {isLoadingSettings ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : settings ? (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">AI Assistant Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Assistant Name</p>
                    <p className="text-sm text-gray-500">{settings.assistantName || 'AI Assistant'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Default Greeting</p>
                    <p className="text-sm text-gray-500">{settings.defaultGreeting || 'Hello! How can I help you today?'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Conversation Style</p>
                    <p className="text-sm text-gray-500">{settings.conversationStyle || 'Professional'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Show Availability</p>
                    <p className="text-sm text-gray-500">{settings.showAvailability ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Chat Font</p>
                    <p className="text-sm text-gray-500">{settings.font || 'System Default'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">User Message Color</p>
                    <div className="flex items-center">
                      <div 
                        className="w-5 h-5 rounded-full mr-2" 
                        style={{ backgroundColor: settings.userBubbleColor || '#f3f4f6' }}
                      ></div>
                      <p className="text-sm text-gray-500">{settings.userBubbleColor || '#f3f4f6'}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Assistant Message Color</p>
                    <div className="flex items-center">
                      <div 
                        className="w-5 h-5 rounded-full mr-2" 
                        style={{ backgroundColor: settings.assistantBubbleColor || '#e5e7eb' }}
                      ></div>
                      <p className="text-sm text-gray-500">{settings.assistantBubbleColor || '#e5e7eb'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => navigate("/settings/edit")}>
                  Edit Settings
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">No settings found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your assistant settings to customize your AIPI experience
            </p>
            <Button variant="default" className="w-full sm:w-auto px-8" onClick={() => navigate("/settings/edit")}>
              Configure Settings
            </Button>
          </Card>
        )}
      </div>
    );
  };

  // Consulta para obtener las conversaciones
  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ["/api/conversations"],
  });

  // Renderizar contenido de la pestaña de conversaciones
  const renderConversationsTab = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Conversations</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Review and manage conversations with your visitors.</p>
        
        {isLoadingConversations ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : conversations && conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map((conversation: any) => (
              <Card key={conversation.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Visitor #{conversation.visitorId || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(conversation.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      conversation.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {conversation.status === 'completed' ? 'Completed' : 'Active'}
                    </span>
                    <Link href={`/conversations/${conversation.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>
                {conversation.lastMessage && (
                  <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <span className="font-medium">Last message: </span>
                    {conversation.lastMessage.length > 100
                      ? conversation.lastMessage.substring(0, 100) + '...'
                      : conversation.lastMessage}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When visitors interact with your chat widget, their conversations will appear here
            </p>
          </Card>
        )}
      </div>
    );
  };

  // Consulta para obtener los formularios
  const { data: forms, isLoading: isLoadingForms } = useQuery({
    queryKey: ["/api/forms"],
  });

  // Renderizar contenido de la pestaña de formularios
  const renderFormsTab = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Forms</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Create and manage your forms.</p>
        
        <div className="flex justify-end mb-4">
          <Button onClick={() => navigate("/create-form")}>Create Form</Button>
        </div>
        
        {isLoadingForms ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : forms && forms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forms.map((form: any) => (
              <Card key={form.id} className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{form.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {form.description || "No description"}
                    </p>
                  </div>
                </div>
                <div className="flex-grow"></div>
                <div className="flex justify-between mt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {form.responseCount || 0} responses
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/forms/${form.id}/responses`}>
                      <Button size="sm" variant="outline">Responses</Button>
                    </Link>
                    <Link href={`/forms/${form.id}/edit`}>
                      <Button size="sm">Edit</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">No forms yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a new form to collect information from your visitors
            </p>
            <Button variant="default" className="w-full sm:w-auto px-8" onClick={() => navigate("/create-form")}>
              Create Form
            </Button>
          </Card>
        )}
      </div>
    );
  };

  // Consulta para obtener las automatizaciones
  const { data: automations, isLoading: isLoadingAutomations } = useQuery({
    queryKey: ["/api/automations"],
  });

  // Renderizar contenido de la pestaña de automatización
  const renderAutomationTab = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Task Automation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Set up automated tasks and workflows powered by AI.</p>
        
        <div className="flex justify-end mb-4">
          <Button onClick={() => navigate("/automations/create")}>Create Automation</Button>
        </div>
        
        {isLoadingAutomations ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : automations && automations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((automation: any) => (
              <Card key={automation.id} className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">{automation.name}</h3>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        automation.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : automation.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                      }`}>
                        {automation.status === 'active' ? 'Active' : 
                         automation.status === 'inactive' ? 'Inactive' : 'Testing'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {automation.description || "No description"}
                    </p>
                  </div>
                </div>
                
                <div className="flex-grow"></div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Link href={`/automations/${automation.id}/logs`}>
                    <Button size="sm" variant="outline">View Logs</Button>
                  </Link>
                  <Link href={`/automations/${automation.id}/edit`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">No automations yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first automation to streamline repetitive tasks with AI
            </p>
            <Button variant="default" className="w-full sm:w-auto px-8" onClick={() => navigate("/automations/create")}>
              Create Automation
            </Button>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="integrations" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="automation">Task Automation</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automation">{renderAutomationTab()}</TabsContent>
        <TabsContent value="conversations">{renderConversationsTab()}</TabsContent>
        <TabsContent value="integrations">{renderIntegrationsTab()}</TabsContent>
        <TabsContent value="forms">{renderFormsTab()}</TabsContent>
        <TabsContent value="settings">{renderSettingsTab()}</TabsContent>
      </Tabs>
    </div>
  );
}