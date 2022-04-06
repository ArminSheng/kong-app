import './App.css'
import { useGetConsumersSchema, useGetPluginsSchema, useGetRoutesSchema } from './data/use-get-schema'
import { FormGroup } from './components/form-group'
import { useValidate } from './data/use-validate-schema'
import { APIs } from './data'

function App() {
  const { data: routes } = useGetRoutesSchema()
  const { data: consumers } = useGetConsumersSchema()
  const { data: plugins } = useGetPluginsSchema()
  const { mutateAsync: validateRoutes, isLoading: routesValidating } = useValidate(APIs.validateRoutes, 'Routes', APIs.routesPost)
  const { mutateAsync: validateConsumers, isLoading: consumerValidating } = useValidate(APIs.validateConsumers, 'Consumers', APIs.consumersPost)
  const { mutateAsync: validatePlugins, isLoading: plgunValidating } = useValidate(APIs.validatePlugins, 'Plugins', APIs.pluginsPost)

  return (
    <div className="layout">
      <div className="card">
        <FormGroup group={'Routes'} data={routes} onSubmit={validateRoutes} isSubmitting={routesValidating} />
      </div>
      <div className="card">
        <FormGroup group={'Consumers'} data={consumers} onSubmit={validateConsumers} isSubmitting={consumerValidating} />
      </div>
      <div className="card">
        <FormGroup group={'Plugins'} data={plugins} onSubmit={validatePlugins} isSubmitting={plgunValidating} />
      </div>
    </div>
  )
}

export default App
