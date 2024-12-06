import { Dialog } from '@headlessui/react'
import { useSnackbar } from 'notistack'
import ProjPhaseHome from '../ProjPhaseHome/ProjPhaseHome'

const InventoryViewSideForm = ({ title, projectDetails }) => {

  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 ">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {projectDetails?.eventName} Inventory
        </Dialog.Title>
      </div>
      <section className="bg-teal-50">
        <ProjPhaseHome
          projectDetails={projectDetails}
          leadDetailsObj={undefined}
          source={undefined}
          unitDetails={undefined}
        />
      </section>
    </div>
  )
}

export default InventoryViewSideForm
