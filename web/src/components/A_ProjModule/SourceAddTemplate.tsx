/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAuth } from 'src/context/firebase-auth-context'
import ModularProjectMetrics from './Comps/SourceAddTable'


const SourceAddTemplate = ({ phase, source }) => {
  const { user } = useAuth()

  const { orgId } = user



  return (
    <div className="lg:col-span-10 border w-full ">


      <ModularProjectMetrics
        title={''}
        data={phase}
        source={source}
      />
    </div>
  )
}

export default SourceAddTemplate
