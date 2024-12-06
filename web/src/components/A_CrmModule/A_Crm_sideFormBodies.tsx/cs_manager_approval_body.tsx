/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState, useRef } from 'react'
import { USER_ROLES } from 'src/constants/userRoles'
import { getPhasesByProject } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import CostBreakUpEditor from 'src/util/costBreakUpEditor'
import { prettyDate } from 'src/util/dateConverter'



export default function CSManagerApprovalBody({
  type,
  setStatusFun,
  selUnitPayload,
}) {
  const { user } = useAuth()

  const { orgId } = user
  const pdfExportComponent = useRef(null)
  const pdfExportComponentConstruct = useRef(null)
  const [selLoanBank, setLoanBank] = useState({})
  const [preSanctionReview, SetPreSanctionReview] = useState('In-Review')
  const [postSanctionReview, SetPostSanctionReview] = useState('In-Review')
  const [S1, setS1] = useState(true)
  const [S2, setS2] = useState(true)
  const [S3, setS3] = useState(true)
  const [S4, setS4] = useState(true)
  const [addiChargesObj, setAddiChargesObj] = useState({})
  const [costSheetA, setCostSheetA] = useState([])
  const [selPhaseObj, setSelPhaseObj] = useState({})
  const [phases, setPhases] = useState([])
  const [phasesList, setPhasesList] = useState([])
  const [newPlotCostSheetA, setNewPlotCostSheetA] = useState([])
  const [newPlotCsObj, setNewPlotCsObj] = useState([])
  const [newPlotPS, setNewPlotPS] = useState([])
  const [newConstructCsObj, setNewConstructCsObj] = useState([])
  const [newConstructCostSheetA, setNewConstructCostSheetA] = useState([])
  const [newConstructPS, setNewConstructPS] = useState([])
  const [newAdditonalChargesObj, setNewAdditonalChargesObj] = useState([])
  const [StatusListA, setStatusListA] = useState([])
  const [showGstCol, setShowGstCol] = useState(true)
  const [bootedPs, setBootedPs] = useState([])

  const [netTotal, setNetTotal] = useState(0)
  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  useEffect(() => {
    console.log('unit details', selUnitPayload)
    setBootedPs(selUnitPayload?.fullPs)
    getPhases(selUnitPayload)
  }, [])
  const getPhases = async (projectDetails) => {
    try {
      const unsubscribe = getPhasesByProject(
        orgId,
        selUnitPayload?.pId,
        (querySnapshot) => {
          const phases = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setPhases(phases)

          phases.map((user) => {
            user.name = user.phaseName
            user.label = user.phaseName
            user.value = user.uid
          })
          setPhasesList(phases)
          if (phases.length > 0) {
            // setSelPhaseName(phases?.[0].phaseName)
            // setSelPhaseIs(phases?.[0].uid)
            // setSelPhaseObj(phases?.[0])
            setSelPhaseObj(phases?.[0])
          }
          console.log('myphases are', phases)
        },
        (e) => {
          console.log('error at getPhases', e)
          setPhases([])
        }
      )
      return unsubscribe
    } catch (error) {
      console.log('error at getting phases', error)
    }
  }
  return (
    <div className="card mr-10 nunF">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-bold uppercase text-[#1f2f3e] mb-[2px] text-[11px]">
            Customer Details
          </p>

          <span>{selUnitPayload?.customerDetailsObj?.customerName1}</span>
          <span>{selUnitPayload?.customerDetailsObj?.phoneNo1 || "NA"}</span>
        </div>
        <div className="flex flex-col text-right">
          <div className="flex-row font-bold uppercase text-[#1f2f3e] text-[10px]">
            Stall No: <span className="text-[#848789] ml-[1px]">{selUnitPayload?.unit_no}</span>
          </div>
          <div className="flex-row font-bold uppercase text-[#1f2f3e] text-[10px]">
            Survey No:<span className="text-[#848789] ml-[1px]">{selUnitPayload?.survey_no || "NA"}</span>
          </div>
          <div className="flex-row font-bold uppercase text-[#1f2f3e] text-[10px]">
            Katha Id: <span className="text-[#848789] ml-[1px]">{selUnitPayload?.katha_id || "NA"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row border-y border-[#ededed] py-[18px] mt-[12px] justify-between">
        <div className="min-w-[120px]">
          <p className="text-title text-xs font-bold uppercase">Invoice No</p>
          <span className=" text-content3 text-[#848789]">NA</span>
        </div>
        <div className="min-w-[120px]">
          <p className="text-title text-xs font-bold uppercase">Booking Date</p>
          <span className="text-content3 text-[#848789]">{prettyDate(selUnitPayload?.booked_on || "NA")}</span>
        </div>
        <div className="min-w-[120px]">
          <p className="text-title text-xs font-bold uppercase">
            payment Status
          </p>
          <span className="text-content3 text-[#848789]">Partial</span>
        </div>
        <div className="min-w-[120px] text-right">
          <p className="text-title text-xs font-bold uppercase">Total Amount</p>
          <span className=" text-medium text-content3 text-[#848789]">
            Rs {netTotal?.toLocaleString('en-IN') || 'NA'}
          </span>
        </div>
      </div>
      {/* <CSBody
        csMode="plot_cs"
        costSheetA={costSheetA}
        selUnitDetails={selUnitPayload}
        setCostSheetA={setCostSheetA}
        setSelPhaseObj={setSelPhaseObj}
        selPhaseObj={selPhaseObj}
        setAddiChargesObj={setAddiChargesObj}
      /> */}
      <CostBreakUpEditor
        csMode={'plot_cs'}
        netTotal= {netTotal}
        setNetTotal ={setNetTotal}
        // costSheetA={costSheetA}
        pdfExportComponent={pdfExportComponent}
        selPhaseObj={selPhaseObj}
        leadDetailsObj1={{ id: 'leadId' }}
        selUnitDetails={selUnitPayload}
        setNewPlotCsObj={setNewPlotCsObj}
        newPlotCsObj={newPlotCsObj}
        costSheetA={newPlotCostSheetA}
        setAddiChargesObj={setNewAdditonalChargesObj}
        setCostSheetA={setNewPlotCostSheetA}
        setNewPS={setNewPlotPS}
        newPlotPS={newPlotPS}
        bootedPs={bootedPs}
      />

    </div>
  )
}
