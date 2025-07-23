/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'

import {
  addUnit,
  addStall,
  checkIfUnitAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
  editPlotUnit,
  streamMasters,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'
import Loader from './Loader/Loader'
import { facingTypeList, plotTypeList,  releaseStausList, statusList, unitTypeList } from 'src/constants/projects'



const AddUnit = ({
  title,
  dialogOpen,
  BlockFeed,
  phaseFeed,
  projectDetails,
  phaseDetails,
  blockDetails,
  data,
  type,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()


  const [selectedSharingType, setSelectedSharingType] = useState(false)


  const handleSharingTypeChange = (e) => {
    setSelectedSharingType(e.target.value)
  }



  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [phaseList, setphaseList] = useState([])
  const [blockList, setblockList] = useState([])
  const [defaultCost, setDefaultCost] = useState({})
  const [unitDetails, setUnitDetails] = useState({})






  const [unitTypeListA, setUnitTypeList] = useState([]);
const [facingTypeListA, setFacingTypeList] = useState([]);
const [bedRoomsListA, setBedRoomsList] = useState([]);
const [bathTypeListA, setBathTypeList] = useState([]);
const [carParkingListA, setCarParkingList] = useState([]);
const [statusListA, setStatusList] = useState([]);
const [mortgageTypeA, setMortgageType] = useState([]);







useEffect(() => {
  const unsubscribe = streamMasters(
    orgId,
    (querySnapshot) => {
      const bankA = querySnapshot.docs.map((docSnapshot) => {
        const x = docSnapshot.data()
        return x
      })

      console.log('fetched users list is', bankA)
      // step 3: filter and set values to each title
      if (bankA?.length > 0) {
        const jA = bankA.filter((item) => item.title === 'Type')
        const kA = bankA.filter((item) => item.title === 'Facing')
        const lA = bankA.filter((item) => item.title === 'Type/BedRooms')
        const mA = bankA.filter((item) => item.title === 'Bathrooms')
        const nA = bankA.filter((item) => item.title === 'Car Parking')
        const oA = bankA.filter((item) => item.title === 'Status')
        const pA = bankA.filter((item) => item.title === 'Mortgage Type')





        setUnitTypeList(jA.sort((a, b) => {
          return a.order - b.order;
        }));

        setFacingTypeList(kA.sort((a, b) => {
          return a.order - b.order;
        }));

        setBedRoomsList(lA.sort((a, b) => {
          return a.order - b.order;
        }));

        setBathTypeList(mA.sort((a, b) => {
          return a.order - b.order;
        }));

        setCarParkingList(nA.sort((a, b) => {
          return a.order - b.order;
        }));

        // setStatusList(oA.sort((a, b) => {
        //   return a.order - b.order;
        // }));
        setStatusList(statusList);

        setMortgageType(pA.sort((a, b) => {
          return a.order - b.order;
        }));

      }
    },
    (error) => setRows([])
  )
  setStatusList(statusList);
  setFacingTypeList(facingTypeList);

  return unsubscribe
}, [])







  console.log('inside it ', {
    title,
    dialogOpen,
    BlockFeed,
    phaseFeed,
    projectDetails,
    phaseDetails,
    blockDetails,
    data,
  })

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])

  useEffect(() => {
    setUnitDetails(data?.unitDetail || {})
  }, [])
  useEffect(() => {
    // sqft_construct_cost_tax plc_tax ,
    // let defaultValues = {
    //   sqft_cost_tax: 10,
    //   sqft_cost_gst: 0,
    //   sqft_construct_cost_tax: 0,
    //   sqft_construct_gst: 0,
    //   plc_tax: 0,
    //   plc_gst: 0,
    // }
    // phaseDetails?.fullcs?.forEach((item) => {
    //   if (item.component.value === 'sqft_cost_tax') {
    //     defaultValues.sqft_cost_tax = parseFloat(item.charges) || 10
    //     defaultValues.sqft_cost_gst = parseFloat(item.gst.value) || 0
    //   } else if (item.component.value === 'sqft_construct_cost_tax') {
    //     defaultValues.sqft_construct_cost_tax = parseFloat(item.charges) || 0
    //     defaultValues.sqft_construct_gst = parseFloat(item.gst.value) || 0
    //   } else if (item.component.value === 'plc_tax') {
    //     defaultValues.plc_tax = parseFloat(item.charges) || 0
    //     defaultValues.plc_gst = parseFloat(item.gst.value) || 0
    //   }
    // })
    // setDefaultCost(
    //   defaultValues
    // )
  }, [])

  useEffect(() => {
    const extractDefaultValues = async () => {
      const defaultValues = {
        sqft_cost_tax: 0,
        sqft_cost_gst: 0,
        sqft_construct_cost_tax: 0,
        sqft_construct_gst: 0,
        plc_tax: 0,
        plc_gst: 0,
      }

      // Simulating asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 0))

      phaseDetails?.fullcs?.forEach((item) => {
        if (item.component.value === 'sqft_cost_tax') {
          defaultValues.sqft_cost_tax = parseFloat(item.charges) || 0
          defaultValues.sqft_cost_gst = parseFloat(item.gst.value) || 0
        } else if (item.component.value === 'sqft_construct_cost_tax') {
          defaultValues.sqft_construct_cost_tax = parseFloat(item.charges) || 0
          defaultValues.sqft_construct_gst = parseFloat(item.gst.value) || 0
        } else if (item.component.value === 'plc_tax') {
          defaultValues.plc_tax = parseFloat(item.charges) || 0
          defaultValues.plc_gst = parseFloat(item.gst.value) || 0
        }
      })

      setDefaultCost(defaultValues)
    }

    extractDefaultValues()
  }, [phaseDetails])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    phaseFeed.map((user) => {
      user.label = user.phaseName
      user.value = user.phaseName
    })
    console.log('fetched users list is', phaseFeed)
    setphaseList(phaseFeed)
  }, [])

  useEffect(() => {
    if (BlockFeed) {
      BlockFeed?.map((user) => {
        user.label = user.blockName
        user.value = user.blockName
      })
      console.log('fetched users list is', phaseFeed)
      setblockList(BlockFeed)
    }
  }, [])

  const aquaticCreatures = [
    { label: 'Select the Event', value: '' },
    { label: 'Subha Ecostone', value: 'subhaecostone' },
    { label: 'Esperanza', value: 'esperanza' },
    { label: 'Nakshatra Township', value: 'nakshatratownship' },
  ]
  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]


  const sharingTypeOptions = [
    { value: 'organiser', label: 'Organiser' },
    { value: 'hall_owner', label: 'Hall Owner' },
    { value: 'investor', label: 'Investor' },

  ];






  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: 'Bangalore,KA' },
    { label: '10 - 20 Lacs', value: 'Cochin,KL' },
    { label: '20 - 30 Lacs', value: 'Mumbai,MH' },
    { label: '30 - 40 Lacs', value: 'Mumbai,MH' },
    { label: '40 - 50 Lacs', value: 'Mumbai,MH' },
    { label: '50 - 60 Lacs', value: 'Mumbai,MH' },
    { label: '60 - 70 Lacs', value: 'Mumbai,MH' },
    { label: '70 - 80 Lacs', value: 'Mumbai,MH' },
    { label: '80 - 90 Lacs', value: 'Mumbai,MH' },
    { label: '90 - 100 Lacs', value: 'Mumbai,MH' },
    { label: '1.0 Cr - 1.1 Cr', value: 'Mumbai,MH' },
    { label: '1.1 Cr - 1.2 Cr', value: 'Mumbai,MH' },
    { label: '1.2 Cr - 1.3 Cr', value: 'Mumbai,MH' },
    { label: '1.3 Cr - 1.4 Cr', value: 'Mumbai,MH' },
    { label: '1.4 Cr - 1.5 Cr', value: 'Mumbai,MH' },
    { label: '1.5 + Cr', value: 'Mumbai,MH' },
  ]

  const plans = [
    {
      name: 'Apartment',
      img: '/apart1.svg',
    },
    {
      name: 'Plots',
      img: '/plot.svg',
    },
    {
      name: 'WeekendVillas',
      img: '/weekend.svg',
    },
    {
      name: 'Villas',
      img: '/villa.svg',
    },
  ]

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }

  const onSubmitFun = async (data, resetForm) => {
    console.log(data)
    setLoading(true)

    // const {
    //   area,
    //   bathrooms,
    //   bedRooms,
    //   buildup_area,
    //   cartpet_area_sqft,
    //   facing,
    //   sqft_rate,
    //   floor,
    //   super_build_up_area,
    //   unit_no,
    // } = data

    const {
      unit_no,
      survey_no,
      Katha_no,
      PID_no,
      area,
      sqft_rate,
      construct_price_sqft,
      plc_per_sqft,
      construct_area,
      uds_sqft,
      floor_plan,
      cartpet_area_sqft,
      dimension,
      bedrooms_c,
      bathrooms_c,
      car_parkings_c,
      tower_no,
      block_no,
      floor_no,
      min_rate_per_sqft,
      min_rate_per_sqft_c,
      size,
      facing,
      unit_d,
      east_d,
      west_d,
      north_d,
      south_d,
      east_west_d,
      north_south_d,

      east_sch_by,
      west_sch_by,
      north_sch_by,
      south_sch_by,
      status,

      release_status,
      mortgage_type,
      landOwnerName,
      investorName,
      sharingType,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfUnitAlreadyExists(
      `${orgId}_units`,
      projectDetails?.uid,
      phaseDetails?.uid || 1,
      blockDetails?.uid || 1,
      unit_no

      // myBlock?.uid,
      // dRow['unit_no']
    )
    const plotData1 = {
      pId: projectDetails?.uid,
      phaseId: phaseDetails?.uid || 1,
      blockId: blockDetails?.uid || 1,
      Date: Timestamp.now().toMillis(),
            unit_no: unit_no,
      // survey_no: survey_no,

      // Katha_no: Katha_no,
      PID_no: PID_no,
      area: area,
      sqft_rate: sqft_rate,
      plc_per_sqft: plc_per_sqft,
      construct_area: construct_area,
      floor_plan: floor_plan,
      cartpet_area_sqft: cartpet_area_sqft,
      uds_sqft: uds_sqft,
      dimension: dimension,
      // car_parkings_c: car_parkings_c,
      block_no: block_no,
      tower_no: tower_no,
      floor_no: floor_no,
      // bathrooms_c: bathrooms_c,
      // bedrooms_c: bedrooms_c,
      construct_price_sqft: construct_price_sqft,
      min_rate_per_sqft_c: min_rate_per_sqft_c,
      min_rate_per_sqft: min_rate_per_sqft,
      size: size,
      facing: facing,
      unit_d: unit_d,
      east_d: east_d,
      west_d: west_d,
      north_d: north_d,
      south_d: south_d,
      east_west_d: east_west_d,
      north_south_d: north_south_d,
      east_sch_by: east_sch_by,
      west_sch_by: west_sch_by,
      north_sch_by: north_sch_by,
      south_sch_by: south_sch_by,
      status: status,
      release_status: release_status,
      // mortgage_type: mortgage_type,
      // landOwnerName: landOwnerName,
      // investorName: investorName,
      sharingType: sharingType,
      intype: 'Form',
      // unit_type: 'plot',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('Stall Already Exists')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addStall(orgId, plotData1, user?.email, `Stall Created by form `)

      // msg2
      resetForm()
      setFormMessage('Stall Added Successfully.')
      setLoading(false)
    }
    return
    setLoading(true)

    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const leadData = {
      Date: Timestamp.now().toMillis(),
      bed_rooms: bedRooms,
      builtup_area: buildup_area,
      builtup_area_uom: 'sqft',
      cartpet_area_sqft: cartpet_area_sqft,
      carpet_area_uom: 'sqft',
      facing: facing,
      floor: floor,
      intype: 'Form',
      mode: '',
      pId: projectDetails?.uid,
      phaseId: phaseDetails?.uid,
      blockId: blockDetails?.uid,
      Status: 'available',
      rate_per_sqft: sqft_rate,
      super_built_up_area: super_build_up_area,
      super_built_up_area_uom: 'sqft',
      undivided_share: '',
      unit_no: unit_no,
      unit_type: '',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('Stall Already Exists')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addUnit(orgId, leadData, user?.email, `Stall Created by form `)

      // msg2
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }
  const onSubmitEditUnitFun = async (data, resetForm) => {
    console.log(data)
    setLoading(true)

    const {
      unit_no,
      survey_no,
      Katha_no,
      PID_no,
      area,
      sqft_rate,
      plc_per_sqft,
      construct_area,
      uds_sqft,
      cartpet_area_sqft,
      floor_plan,
      dimension,
      bedrooms_c,
      bathrooms_c,
      car_parkings_c,
      tower_no,
      block_no,
      floor_no,
      min_rate_per_sqft,
      min_rate_per_sqft_c,
      construct_price_sqft,
      size,
      facing,
      unit_d,
      east_d,
      west_d,
      north_d,
      south_d,
      east_west_d,
      north_south_d,

      east_sch_by,
      west_sch_by,
      north_sch_by,
      south_sch_by,
      status,

      release_status,
      mortgage_type,
      landOwnerName,
      investorName,
      sharingType,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const plotData1 = {
      pId: projectDetails?.uid,
      phaseId: phaseDetails?.uid || 1,
      blockId: blockDetails?.uid || 1,
      Date: Timestamp.now().toMillis(),
      unit_no: unit_no,
      survey_no: survey_no,

      Katha_no: Katha_no,
      PID_no: PID_no,
      area: area,
      sqft_rate: sqft_rate,
      plc_per_sqft: plc_per_sqft,
      construct_area: construct_area,
      floor_plan: floor_plan,
      cartpet_area_sqft: cartpet_area_sqft,
      uds_sqft: uds_sqft,
      dimension: dimension,
      car_parkings_c: car_parkings_c,
      block_no: block_no,
      tower_no: tower_no,
      floor_no: floor_no,
      bathrooms_c: bathrooms_c,
      bedrooms_c: bedrooms_c,
      construct_price_sqft: construct_price_sqft,
      min_rate_per_sqft: min_rate_per_sqft,
      min_rate_per_sqft_c: min_rate_per_sqft_c,
      size: size,
      facing: facing,
      unit_d,
      east_d: east_d,
      west_d: west_d,
      north_d: north_d,
      south_d: south_d,
      east_west_d: east_west_d,
      north_south_d: north_south_d,
      east_sch_by: east_sch_by,
      west_sch_by: west_sch_by,
      north_sch_by: north_sch_by,
      south_sch_by: south_sch_by,
      status: status,
      release_status: release_status,
      mortgage_type: mortgage_type,
      landOwnerName: landOwnerName,
      investorName: investorName,
      sharingType: sharingType,
      intype: 'Form',
      unit_type: 'plot',
      by: user?.email,
    }
    console.log('user is ', user)
    // proceed to copy
    await editPlotUnit(
      orgId,
      unitDetails?.uid,
      plotData1,
      user?.email,
      `Stall Created by form `,
      enqueueSnackbar
    )

    // msg2
    // await resetForm()
    await setFormMessage('Stall Saved Successfully..!')
    await setLoading(false)
    return
  }

  // const unitTypeList = [
  //   { label: 'Select Count', value: '' },
  //   { label: '1 Bhk', value: 1 },
  //   { label: '2 Bhk', value: 2 },
  //   { label: '2.5 Bhk', value: 3 },
  //   { label: '3 Bhk', value: 4 },
  //   { label: '3.5 Bhk', value: 5 },
  //   { label: '4 Bhk', value: 6 },
  //   { label: '5 Bhk', value: 7 },
  // ]


  // const bedRoomsList = [
  //   { label: 'Select Count', value: '' },
  //   { label: '1 Bedroom', value: 'bed1' },
  //   { label: '2 Bedroom', value: 'bed2' },
  //   { label: '3 Bedroom', value: 'bed3' },
  //   { label: '4 Bedroom', value: 'bed4' },
  //   { label: '5 Bedroom', value: 'bed5' },
  //   // { label: '6 Bedroom', value: 'bed6' },
  //   // { label: '7 Bedroom', value: 'bed7' },
  // ]



  // const carParkingList = [
  //   { label: 'Select Count', value: '' },
  //   { label: '1 Car Parking', value: 'car1' },
  //   { label: '2 Car Parking', value: 'car2' },
  //   { label: '3 Car Parking', value: 'car3' },
  //   { label: '4 Car Parking', value: 'car4' },
  //   { label: '5 Car Parking', value: 'car5' },
  // ]




  // const plotTypeList = [
  //   { label: 'Select Count', value: '' },
  //   { label: 'Rectangle', value: 'rectangle' },
  //   { label: 'Irregular', value: 'odd' },
  //   { label: 'Square', value: 'even' },
  // ]

  // const bathTypeList = [
  //   { label: 'Select Count', value: '' },
  //   { label: '1 Bathroom', value: 'bath1' },
  //   { label: '2 Bathroom', value: 'bath2' },
  //   { label: '3 Bathroom', value: 'bath3' },
  //   { label: '4 Bathroom', value: 'bath4' },
  //   { label: '5 Bathroom', value: 'bath5' },
  // ]
  // const facingTypeList = [
  //   { label: 'Select Facing', value: '' },
  //   { label: 'East', value: 'east' },
  //   { label: 'West', value: 'west' },
  //   { label: 'North', value: 'north' },
  //   { label: 'South', value: 'south' },
  //   { label: 'South-East', value: 'south-east' },
  //   { label: 'South-West', value: 'south-west' },
  //   { label: 'North-East', value: 'north-east' },
  //   { label: 'North-West', value: 'north-west' },
  // ]

  // const statusList = [
  //   { label: 'Select the Status', value: '' },
  //   { label: 'Available', value: 'available' },
  //   { label: 'Blocked by Customer', value: 'customer_blocked' },
  //   { label: 'Blocked by Management', value: 'management_blocked' },
  //   { label: 'Sold', value: 'sold' },
  // ]

  // const releaseStausList = [
  //   { label: 'Release Status', value: '' },
  //   { label: 'Yes', value: 'yes' },
  //   { label: 'No', value: 'no' },
  // ]
  // const mortgageType = [
  //   { label: 'Select Mortgage', value: '' },
  //   { label: 'NA', value: 'na' },
  //   { label: 'Bank', value: 'bank' },
  //   { label: '3rd Party Investor', value: '3rd_party_investor' },
  // ]












  // const validate = Yup.object({

  // unit_no: Yup.string()
  // .max(15, 'Must be 15 characters or less')
  // .required('Unit_no is Required'),
  // lastName: Yup.string()
  //   .max(20, 'Must be 20 characters or less')
  //   .required('Required'),
  // sqft_rate: Yup.number().required('sqft rate is required'),
  // bedRooms:
  //   projectDetails?.projectType?.name === 'Apartment'
  //     ? Yup.string().required('bedRooms is required')
  //     : Yup.string().notRequired(),
  // floor: Yup.number().required('floor is required'),
  // bathrooms:
  //   projectDetails?.projectType?.name === 'Apartment'
  //     ? Yup.string().required('bathrooms is required')
  //     : Yup.string().notRequired(),
  // // bathrooms: Yup.string().required('bathrooms is required'),
  // area:
  //   projectDetails?.projectType?.name === 'Plots'
  //     ? Yup.number().required('area is required')
  //     : Yup.number().notRequired(),

  // facing: Yup.string().required('facing is required'),
  // cartpet_area_sqft: Yup.number().required('Carpet Area is required'),
  // buildup_area: Yup.number().required('Buildup Area is required'),
  // super_build_up_area: Yup.number().required('Sqft Rate is required'),
  // })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  function setFieldValue(arg0: string, value: any) {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="h-full flex flex-col pb-6 bg-white shadow-xl overflow-y-scroll">
      {/* <div className="border-b py-3">
        <div className="px-2 sm:px-6  z-10 flex items-center justify-between">
          <Dialog.Title className=" font-semibold text-xl mr-auto  text-[#053219]">
            {title}
          </Dialog.Title>
        </div>
      </div> */}

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col ">
          <div className="mt-0">
            {/* new one */}

            <Formik
              enableReinitialize={true}
              initialValues={{
                unit_no: unitDetails?.unit_no || '',
                survey_no: unitDetails?.survey_no || '',
                Katha_no: unitDetails?.Katha_no || '',
                PID_no: unitDetails?.PID_no || '',
                area: unitDetails?.area || 0,
                sqft_rate:
                  unitDetails?.sqft_rate || defaultCost?.sqft_cost_gst || 0,
                plc_per_sqft: unitDetails?.plc_per_sqft || 0,
                construct_area: unitDetails?.construct_area || 0,
                cartpet_area_sqft: unitDetails?.cartpet_area_sqft || 0,
                uds_sqft: unitDetails?.uds_sqft || 0,
                floor_plan: unitDetails?.floor_plan || 0,
                bedrooms_c: unitDetails?.bedrooms_c || 0,
                bathrooms_c: unitDetails?.bathrooms_c || 0,
                car_parkings_c: unitDetails?.car_parkings_c || 0,
                tower_no: unitDetails?.tower_no || 0,
                block_no: unitDetails?.block_no || 0,
                floor_no: unitDetails?.floor_no || 0,
                dimension: unitDetails?.dimension || 0,
                min_rate_per_sqft_c: unitDetails?.min_rate_per_sqft_c || 0,

                size: unitDetails?.size || '',
                facing: unitDetails?.facing || '',
                unit_d: unitDetails?.unit_d || '',
                min_rate_per_sqft: unitDetails?.min_rate_per_sqft || 0,
                construct_price_sqft: unitDetails?.construct_price_sqft || 0,
                east_d: unitDetails?.east_d || 0,
                west_d: unitDetails?.west_d || 0,
                north_d: unitDetails?.north_d || 0,
                south_d: unitDetails?.south_d || 0,
                east_west_d: unitDetails?.east_west_d || 0,
                north_south_d: unitDetails?.north_south_d || 0,
                east_sch_by: unitDetails?.east_sch_by || '',
                west_sch_by: unitDetails?.west_sch_by || '',
                south_sch_by: unitDetails?.south_sch_by || '',
                north_sch_by: unitDetails?.north_sch_by || '',
                status: unitDetails?.status || '',
                release_status: unitDetails?.release_status || '',
                mortgage_type: unitDetails?.mortgage_type || '',
                landOwnerName: unitDetails?.landOwnerName || '',
                investorName: unitDetails?.investorName || '',
                sharingType: unitDetails?.sharingType || '',
                // bathrooms: '',
                // cartpet_area_sqft: 0,
                // buildup_area: 0,
                // super_build_up_area: 0,
              }}
              // validationSchema={validate_AddUnit}
              onSubmit={(values, { resetForm }) => {
                console.log('ami submitted', values)
                if (title === 'Edit Stall') {
                  onSubmitEditUnitFun(values, resetForm)
                } else {
                  onSubmitFun(values, resetForm)
                }
              }}
            >
              {(formik) => (



                <div className="">
                  <section className=" rounded-lg bg-white  ">
                    <Form>
                      <div className="">
                        <div className="inline ">
                          <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
                            <section className="flex flex-row mx-4 py-4">
                              <span className="ml-2 mt-[1px] ">
                                <label className="font-semibold text-[#053219]  text-[18px]  mb-1  ">
                                  {title === 'Add Stall'
                                    ? 'Add Stall'
                                    : 'Edit Stall'}

                                  <abbr title="required"></abbr>
                                </label>
                              </span>
                            </section>
                          </div>
                        </div>
                      </div>

                      <section className="my-10 mx-3  my-4 mt-4">
                        <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                          <section className="flex flex-row  pt-2 ">
                            <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>
                            <span className="ml-1 leading-[15px] ">
                              <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                Stall<abbr title="required"></abbr>
                              </label>
                            </span>
                          </section>

                          <div className="md:flex flex-row md:space-x-4 w-full text-xs  ">
                            <div className=" space-y-2 w-full text-xs mt-2">
                              <TextField
                                label="Stall No*"
                                name="unit_no"
                                type="text"
                              />
                            </div>
                            {projectDetails?.projectType?.name ===
                              'Apartment' && (
                              <div className="mb-3 space-y-2 w-full text-xs mt-2">
                                <TextField
                                  label="Block"
                                  name="block_no"
                                  type="text"
                                />
                              </div>
                            )}
                            {projectDetails?.projectType?.name ===
                              'Apartment' && (
                              <div className="mb-3 space-y-2 w-full text-xs mt-2">
                                <TextField
                                  label="Tower"
                                  name="tower_no"
                                  type="text"
                                />
                              </div>
                            )}

                            {projectDetails?.projectType?.name ===
                              'Apartment' && (
                              <div className="mb-3 space-y-2 w-full text-xs mt-2">
                                <TextField
                                  label="Floor"
                                  name="floor_no"
                                  type="text"
                                />
                              </div>
                            )}

                            {/* <div className="mb-3 space-y-2 w-full text-xs mt-2">
                              <TextField
                                label="Type*"
                                name="size"
                                type="text"
                              />
                            </div> */}

                            {projectDetails?.projectType?.name === 'Plots' && (
                              <div className="w-full flex flex-col mt-2">
                                <CustomSelect
                                  name="size"
                                  label="Type*"
                                  className="input mt-"
                                  onChange={(value) => {
                                    formik.setFieldValue('size', value.value)
                                  }}
                                  value={formik.values.size}
                                  // options={aquaticCreatures}
                                  options={
                                    projectDetails?.projectType?.name ===
                                    'Plots'
                                      ? plotTypeList
                                      : unitTypeListA
                                  }

                                  //options={unitTypeList}
                                />
                              </div>
                            )}
                            {(projectDetails?.projectType?.name === 'Villas' ||
                              projectDetails?.projectType?.name ===
                                'Plots') && (
                              <div className="mb-3 space-y-2 w-full text-xs mt-2">
                                <TextField
                                  label="Dimension"
                                  name="dimension"
                                  type="text"
                                />
                              </div>
                            )}
                            {projectDetails?.projectType?.name === 'Villas' && (
                              <div className="w-full flex flex-col mt-2">
                                <CustomSelect
                                  name="size"
                                  label="Type*"
                                  className="input mt-"
                                  onChange={(value) => {
                                    formik.setFieldValue('size', value.value)
                                  }}
                                  value={formik.values.size}
                                  // options={aquaticCreatures}
                                  options={
                                    projectDetails?.projectType?.name ===
                                    'Plots'
                                      ? plotTypeList
                                      : unitTypeList
                                  }

                                  //options={unitTypeList}
                                />
                              </div>
                            )}
                            <div className="w-full flex flex-col mt-2">
                              <CustomSelect
                                name="facing"
                                label="Facing*"
                                className="input mt-"
                                onChange={(value) => {
                                  formik.setFieldValue('facing', value.value)
                                }}
                                value={formik.values.facing}
                                // options={aquaticCreatures}
                                options={facingTypeListA}
                              />
                            </div>
                          </div>
                        </section>

                        {(projectDetails?.projectType?.name === 'Villas' ||
                          projectDetails?.projectType?.name ===
                            'Apartment') && (
                          <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                            <section className="flex flex-row  pt-2 ">
                              <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>
                              <span className="ml-1 leading-[15px] ">
                                <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                  Details<abbr title="required"></abbr>
                                </label>
                              </span>
                            </section>
                            <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                              {/* <div className=" space-y-2 w-full text-xs mt-">
                                <TextField
                                  label="Bedrooms"
                                  name="bedrooms_c"
                                  type="number"
                                />
                              </div> */}
                              {/* <div className="space-y-2 w-full text-xs ">
                              <TextField
                                label={`${["Villas","Plots"].includes(projectDetails?.projectType?.name)? "BUA Sqft*" : "Super BUA"
                                }`}
                                name="area"
                                type="number"
                              />
                            </div> */}
                              <div className="w-full flex flex-col mt-">
                                <CustomSelect
                                  name="bedrooms_c"
                                  label="Type/BedRooms*"
                                  className="input mt-"
                                  onChange={(value) => {
                                    formik.setFieldValue('bedrooms_c', value.value)
                                    formik.setFieldValue(
                                      'bedrooms_c',
                                      value.value
                                    )
                                  }}
                                  value={formik.values.bedrooms_c}
                                  // options={aquaticCreatures}
                                  // options={
                                  //   projectDetails?.projectType?.name ===
                                  //   'Plots'
                                  //     ? plotTypeList
                                  //     : unitTypeList
                                  // }

                                  options={bedRoomsListA}
                                />
                              </div>

                              <div className="space-y-2 w-full text-xs mt-">
                                {/* <TextField
                                  label="Bathrooms"
                                  name="bathrooms_c"
                                  type="number"
                                /> */}
                                <CustomSelect
  name="bathrooms_c"
  label="Bathrooms"
  className="input mt-"
  onChange={(value) => {
    formik.setFieldValue('bathrooms_c', value.value);
  }}
  value={formik.values.bathrooms_c}
  options={bathTypeListA}
/>
                              </div>

                              <div className="mb-3 space-y-2 w-full text-xs mt-">
                                {/* <TextField
                                  label="Car Parking"
                                  name="car_parkings_c"
                                  type="text"
                                /> */}

<CustomSelect
    name="car_parkings_c"
    label="Car Parking"
    className="input mt-"
    onChange={(value) => {
      formik.setFieldValue('car_parkings_c', value.value);
    }}
    value={formik.values.car_parkings_c}
    options={carParkingListA}
  />
                              </div>

                              {/* <div className="space-y-2 w-full text-xs ">
    <TextField
      label={`${["Villas","Plots"].includes(projectDetails?.projectType?.name)? "BUA Sqft*" : "Super BUA"
      }`}
      name="area"
      type="number"
    />
  </div> */}

                              {projectDetails?.projectType?.name ===
                                'Apartment' && (
                                <div className="space-y-2 w-full text-xs mt-">
                                  <TextField
                                    label="Carpet Area sqft"
                                    name="cartpet_area_sqft"
                                    type="number"
                                  />
                                </div>
                              )}

                              {projectDetails?.projectType?.name ===
                                'Apartment' && (
                                <div className=" space-y-2 w-full text-xs mt-">
                                  <TextField
                                    label="UDS sqft"
                                    name="uds_sqft"
                                    type="number"
                                  />
                                </div>
                              )}
                            </div>
                          </section>
                        )}

                        <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                          <section className="flex flex-row  pt-2 ">
                            <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>
                            <span className="ml-1 leading-[15px] ">
                              <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                Pricing<abbr title="required"></abbr>
                              </label>
                            </span>
                          </section>
                          <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                            {/* <div className="space-y-2 w-full text-xs ">
                              <TextField
                                label={`${["Villas","Plots"].includes(projectDetails?.projectType?.name)? "Plot Area Sqft*" : "Super BUA"
                                }`}
                                name="area"
                                type="number"
                              />
                            </div> */}

                            <div className="space-y-2 w-full text-xs ">
                              <TextField
                                label={`${
                                  ['Villas', 'Plots'].includes(
                                    projectDetails?.projectType?.name
                                  )
                                    ? 'Land Area sqft*'
                                    : 'Stall Area sqft'
                                }`}
                                name="area"
                                type="number"
                              />
                            </div>

                            <div className=" space-y-2 w-full text-xs mt-">
                              <TextField
                                label="Price per sqft *"
                                name="sqft_rate"
                                type="number"
                              />
                            </div>
                            <div className="space-y-2 w-full text-xs mt-">
                              <TextField
                                label="PLC per sqft*"
                                name="plc_per_sqft"
                                type="number"
                              />
                            </div>

                            <div className="mb-3 space-y-2 w-full text-xs mt-">
                              <TextField
                                label="Min Price per Sqft"
                                name="min_rate_per_sqft"
                                type="text"
                              />
                            </div>
                          </div>
                        </section>

                        {projectDetails?.projectType?.name === 'Villas' && (
                          <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                            <section className="flex flex-row  pt-2 ">
                              <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>
                              <span className="ml-1 leading-[15px] ">
                                <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                  Construction Pricing
                                  <abbr title="required"></abbr>
                                </label>
                              </span>
                            </section>
                            <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                              <div className="space-y-2 w-full text-xs mt-">
                                <TextField
                                  label="BUA Sqft*"
                                  name="construct_area"
                                  type="number"
                                />
                              </div>

                              <div className=" space-y-2 w-full text-xs mt-">
                                <TextField
                                  label="Price per Sqft *"
                                  name="construct_price_sqft"
                                  type="number"
                                />
                              </div>
                              {/* <div className="space-y-2 w-full text-xs ">
                              <TextField
                                label={`${["Villas","Plots"].includes(projectDetails?.projectType?.name)? "BUA Sqft*" : "Super BUA"
                                }`}
                                name="area"
                                type="number"
                              />
                            </div> */}

                              <div className="mb-3 space-y-2 w-full text-xs mt-">
                                <TextField
                                  label="Carpet Area Sqft"
                                  name="cartpet_area_sqft"
                                  type="text"
                                />
                              </div>
                              <div className="mb-3 space-y-2 w-full text-xs mt-">
                                <TextField
                                  label="Min Price per Sqft"
                                  name="min_rate_per_sqft_c"
                                  type="text"
                                />
                              </div>
                            </div>
                          </section>
                        )}

                        <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                          <section className="flex flex-row  pt-2 ">
                            <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>

                            <span className="ml-1 leading-[15px] ">
                              <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                Dimensions<abbr title="required"></abbr>
                              </label>
                            </span>
                          </section>
                          <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                            <div className="mb-3 space-y-2 w-full text-xs mt-">
                              <TextField
                                label="East"
                                name="east_d"
                                type="text"
                              />
                            </div>
                            <div className="mb-3 space-y-2 w-full text-xs">
                              <TextField
                                label="West"
                                name="west_d"
                                type="text"
                              />
                            </div>

                            {projectDetails?.projectType?.name !=
                              'Apartment' && (
                              <div className="mb-3 space-y-2 w-full text-xs ">
                                <TextField
                                  label="North"
                                  name="north_d"
                                  type="number"
                                />
                              </div>
                            )}
                            <div className="mb-3 space-y-2 w-full text-xs ">
                              <TextField
                                label="South"
                                name="south_d"
                                type="number"
                              />
                            </div>
                            <div className="mb-3 space-y-2 w-full text-xs mt-">
                              <TextField
                                label="East-West"
                                name="east_west_d"
                                type="number"
                              />
                            </div>
                            <div className="mb-3 space-y-2 w-full text-xs">
                              <TextField
                                label="North-South"
                                name="north_south_d"
                                type="number"
                              />
                            </div>
                          </div>
                        </section>

                        {/* <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                          <section className="flex flex-row  pt-2 ">
                            <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>

                            <span className="ml-1 leading-[15px] ">
                              <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                Schedule<abbr title="required"></abbr>
                              </label>
                            </span>
                          </section>
                          <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                            <div className="mb-3 space-y-2 w-full text-xs mt-">
                              <TextField
                                label="East by"
                                name="east_sch_by"
                                type="text"
                              />
                            </div>
                            <div className="mb-3 space-y-2 w-full text-xs">
                              <TextField
                                label="West by"
                                name="west_sch_by"
                                type="text"
                              />
                            </div>
                            <div className="mb-3 space-y-2 w-full text-xs ">
                              <TextField
                                label="North by"
                                name="north_sch_by"
                                type="text"
                              />
                            </div>

                            <div className="mb-3 space-y-2 w-full text-xs ">
                              <TextField
                                label="South by"
                                name="south_sch_by"
                                type="text"
                              />
                            </div>
                          </div>
                        </section> */}

                        <section className="mt-1 px-4 rounded-lg bg-white border border-gray-100 shadow">
                          <section className="flex flex-row  pt-2 ">
                            <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-cyan-200"></div>

                            <span className="ml-1 leading-[15px] ">
                              <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                Status<abbr title="required"></abbr>
                              </label>
                            </span>
                          </section>
                          <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">
                            <div className="w-full flex flex-col mb-3">
                              <CustomSelect
                                name="status"
                                label="Status*"
                                className="input mt-"
                                onChange={(value) => {
                                  formik.setFieldValue('status', value.value)
                                }}
                                value={formik.values.status}
                                // options={aquaticCreatures}
                                options={statusListA}
                              />
                            </div>
                            <div className="w-full flex flex-col mb-3">
                              <CustomSelect
                                name="release_status"
                                label="Release Status*"
                                className="input mt-"
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    'release_status',
                                    value.value
                                  )
                                }}
                                value={formik.values.release_status}
                                // options={aquaticCreatures}
                                options={releaseStausList}
                              />
                            </div>
                          </div>
                          <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">







<div className="w-full flex flex-col mb-3">
      <CustomSelect
        name="sharingType"
        label="Sharing Type"
        options={sharingTypeOptions}
        onChange={(value) => {
          formik.setFieldValue('sharingType', value.value);
          setSelectedSharingType(value.value);
        }}
        value={formik.values.sharingType}
      />

      {selectedSharingType === 'Land Owner' && (
        <div className="flex flex-col mt-2 rounded-lg pt-4">
          <div className="mb-4 mt-2">
            <div className="inline">
              <div className="">
                <label className="font-semibold text-[#053219] text-sm mb-1">
                  Land Owner Details
                </label>
              </div>
              <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
            </div>
          </div>
          <TextField
            name="landOwnerName"
            label="Land Owner Name"
            type="text"
            value={formik.values.landOwnerName}
            onChange={formik.handleChange}
          />
        </div>
      )}

      {selectedSharingType === 'Investor' && (
        <div className="flex flex-col mt-2 rounded-lg pt-4">
          <div className="mb-4 mt-2">
            <div className="inline">
              <div className="">
                <label className="font-semibold text-[#053219] text-sm mb-1">
                  Investor Details
                </label>
              </div>
              <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
            </div>
          </div>
          <TextField
            name="investorName"
            label="Investor Name"
            type="text"
            value={formik.values.investorName}
            onChange={formik.handleChange}
          />
        </div>
      )}
    </div>


                        </div>


                        </section>


                      </section>
                      {/* 6 */}

                      <div className=" z-10 flex flex-row justify-between mt-4 pb-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
                        <p className="text-xs text-red-400 text-right my-3 mt-10 mx-3">
                          <abbr title="Required field">*</abbr> fields are
                          mandatory
                        </p>
                        {[
                          'Stall Added Successfully.',
                          'Saved Successfully..!',
                          'Stall Saved Successfully..!',
                        ].includes(formMessage) && (
                          <p className=" flex text-md text-slate-800 text-right my-3">
                            <img
                              className="w-[40px] h-[40px] inline mr-2"
                              alt=""
                              src="/ok.gif"
                            />
                            <span className="mt-2">{formMessage}</span>
                          </p>
                        )}
                        {formMessage === 'Stall Already Exists' && (
                          <p className=" flex text-md text-pink-800 text-right my-3">
                            <img
                              className="w-[40px] h-[40px] inline mr-2"
                              alt=""
                              src="/error.gif"
                            />
                            <span className="mt-2">{formMessage}</span>
                          </p>
                        )}
                        <div className="mt-5 mt-8 text-right md:space-x-3 md:block flex flex-col-reverse">
                          <button
                            className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100"
                            type="reset"
                            onClick={() => resetter()}
                          >
                            Reset
                          </button>
                          <button
                            className="mb-2  md:mb-0 bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-lg hover:shadow-lg hover:bg-green-500"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && <Loader />}
                            <span>
                              {' '}
                              {title === 'Edit Stall' ? 'Edit Stall' : 'Add Stall'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  </section>
                </div>

              )}
            </Formik>
          </div>
        </div>

        <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-4"></div>
      </div>
    </div>
  )
}

export default AddUnit
function setRows(arg0: undefined[]) {
  throw new Error('Function not implemented.')
}

