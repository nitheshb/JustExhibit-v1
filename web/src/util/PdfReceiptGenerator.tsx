import React from 'react'
import { useMemo, useEffect } from 'react'

import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer'
import { format, getTime, formatDistanceToNow } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import numeral from 'numeral'

import { useAuth } from 'src/context/firebase-auth-context'

import { computeTotal } from './computeCsTotals'
import { prettyDate } from './dateConverter'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf' },
  ],
})
const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        fitter: {
          paddingLeft: '20px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingRight: '20px',
        },
        smallFitter: {
          paddingLeft: '10px',
        },
        headFitter: {
          padding: '10px',
        },
        AllsmallFitter: {
          padding: '10px',
        },
        col4: {
          width: '33%',
          paddingLeft: '20px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingRight: '20px',
        },
        col: { width: '23%' },
        col8: { width: '75%' },
        col2: { width: '13%', marginTop: '10px' },
        col6: { width: '50%' },
        p4: { padding: '4px' },
        p10: { padding: '4px 6px' },
        p11: { padding: '0px 0px' },
        p12: { paddingTop: '4px', paddingBottom: '2px' },
        pr0: { paddingRight: '0px' },
        pr4: { paddingRight: '4px' },
        pr8: { paddingRight: '8px' },
        mb4: { marginBottom: 4 },
        mb2: { marginBottom: 2 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        mb30: { marginBottom: 30 },
        mb20: { marginBottom: 20 },
        mb10: { marginBottom: 10 },
        mb5: { marginBottom: 5 },
        mr5: { marginRight: 10 },
        mr15: { marginRight: 15 },
        mT0: { marginTop: 0 },
        mT1: { marginTop: 10 },
        ml1: { marginLeft: 5 },
        ml2: { marginLeft: 10 },
        mr2: { marginRight: 10, paddingRight: 10 },
        ml4: { marginLeft: 20 },
        ml5: { marginLeft: 30 },
        pl1: { paddingLeft: 5 },
        pl2: { paddingLeft: 10 },
        pl3: { paddingLeft: 15 },
        pr1: { paddingRight: 5 },
        pr2: { paddingRight: 10 },
        pr3: { paddingRight: 15 },
        pt2: { paddingTop: 4 },
        pt5: { paddingTop: 10 },
        h3: { fontSize: 16, fontWeight: 400 },
        h4: { fontSize: 13, fontWeight: 700 },
        h1: {
          fontSize: 20,
          fontWeight: 700,
        },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 8, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        alignLeft: { textAlign: 'left' },
        alignCenter: { textAlign: 'center' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFF8F2',
          textTransform: 'capitalize',
          padding: '0px',
          // padding: '40px 24px 60px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
        },
        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        contBorder: {
          border: 0.5,
          borderStyle: 'solid',
          // borderColor: '#DFE3E8',
        },
        dashBorder: {
          borderBottom: 1,
          borderStyle: 'dashed',
          borderColor: '#DFE3E8',
        },
        table: {
          display: 'flex',
          width: 'auto',
          border: 0.5,
          borderStyle: 'solid',
        },
        tableRow: {
          // padding: '8px 0',
          flexDirection: 'row',
          // borderBottomWidth: 0.5,
          // borderStyle: 'solid',
          // borderColor: '#DFE3E8',
        },
        borderbottom: {
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        totalRow: {
          padding: '6px 0',
          marginTop: '8px',
          flexDirection: 'row',
          borderRadius: 3,
          // borderWidth: 1,
          // borderStyle: 'solid',
          // borderColor: '#DFE3E8',
          // backgroundColor: '#DFF6DD',
        },
        totalRowNew: {
          // padding: '6px 0',
          // marginTop: '8px',

          flexDirection: 'row',
          borderRadius: 1,
          // borderWidth: 1,
          // borderStyle: 'solid',
          // borderColor: '#DFE3E8',
          // backgroundColor: '#DFF6DD',
        },
        topBoderRadius: {
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
        tableHeader: {
          padding: '8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1.5,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        bg: {
          backgroundColor: '#F3FFF2',
          paddingHorizontal: '4px',
          paddingVertical: '8px',
        },
        bg1: {
          backgroundColor: '#fff',
          // paddingHorizontal: '4px',
        },
        bg2: {
          backgroundColor: '#F3FFF2',
          padding: '8px 0',
          flexDirection: 'row',
        },
        bg3: {
          backgroundColor: '#DFF6DD',
          padding: '8px 0',
          flexDirection: 'row',
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '5%',
          //  paddingLeft: 10,
        },
        tableCell_35: {
          width: '35%',
          // paddingRight: 16,
        },
        tableCell_20: {
          width: '20%',
          paddingRight: 16,
        },
        tableCell_2: {
          width: '50%',
          // paddingRight: 16,
        },
        tableCell_5: {
          width: '30%',
          // paddingRight: 16,
        },
        tableCell_4: {
          width: '53%',
          paddingRight: 8,
          marginRight: 2,
        },
        tableCell_3: {
          width: '15%',
          paddingRight: 16,
        },
        cellBg0: {
          backgroundColor: '#fffaee',
        },
        cellBg1: {
          backgroundColor: '#f8f2e2',
        },
        cellBg2: {
          backgroundColor: '#f8efd2',
        },
        cellBg3: {
          backgroundColor: '#f6e8c2',
        },
        cellBgHead: {
          backgroundColor: '#FFF8F2',
        },
      }),
    []
  )
export type IInvoice = {
  id: number
  invoiceName: string
  eventName: string
  sent: number
  dueDate: Date
  taxes: number
  payment: chargeTotal
  totalSaleValue: totalsalevalue
  status: string
  PaymentItems: paymentItems[]
  subTotal: number
  createDate: Date
  discount: number
  charges: Charges[]
  paymentHeader: string
  shipping: number
  totalAmount: number
  chargeTotal: chargeTotal
  invoiceNumber: string
  items: IInvoiceItem[]
  itemTotal: ItemTotal
  invoiceTo: IAddressItem
  invoiceFrom: IAddressItem
}
export type IAddressItem = {
  id?: number
  name: string
  company?: string
  primary?: boolean
  fullAddress: string
  phoneNumber?: string
  addressType?: string
}
export type ItemTotal = {
  title: string
  RatePerSqft: number
  total: number
  SaleValue: number
}
export type chargeTotal = {
  title: string
  total: number
}
export type IInvoiceItem = {
  id: number
  title: string
  RatePerSqft: number
  total: number
  SaleValue: number
  service: string
  quantity: number
}
export type Charges = {
  id: number
  title: string
  description: string
  total: number
}
export type totalsalevalue = {
  title: string
  total_A: number
  total_B: number
  total: number
}
export type paymentItems = {
  id: number
  title: string
  timeline: string
  total: number
}

type InputValue = string | number | null
type InputValue2 = Date | string | number | null | undefined
const createDate: Date = new Date('2023-08-19T12:00:00')
const dueDate: Date = new Date('2023-08-21T12:00:00')
function result(format: string, key = '.00', currencySymbol: string) {
  const isInteger = format.includes(key)

  return isInteger
    ? currencySymbol + format.replace(key, '')
    : currencySymbol + format
}
export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format('0,0.00') : ''

  // Format the currency symbol using Intl.NumberFormat
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })
  const formatedValue = currencyFormatter.format(parseFloat(format))

  return result(format, '.00', '₹')
}
export function fDate(date: InputValue2, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy'

  return date ? format(new Date(date), fm) : ''
}
const i = 0

const invoiceDet: IInvoice[] = [
  {
    id: 1,
    eventName: 'PSP NIRVANA1',
    invoiceName: 'COST SHEET',
    sent: 1,
    paymentHeader: 'PAYMENT SCHEDULE',
    payment: {
      title: 'Plot Value Total Rs.:',
      total: 9873341,
    },
    dueDate: dueDate,
    taxes: 2000,
    status: 'pending',
    subTotal: 200000,
    createDate: createDate,
    discount: 500,
    shipping: 200,
    totalAmount: 201300,
    PaymentItems: [
      {
        id: 1,
        title: 'On Booking',
        timeline: 'Booking Advance',
        total: 200000,
      },
      {
        id: 2,
        title: 'On Execution of Agreement to sell ',
        timeline: '15 Days from Booking',
        total: 2418335,
      },
      {
        id: 3,
        title: 'On Execution of Sale Deed for registration',
        timeline: 'Booking Advance',
        total: 7255006,
      },
    ],
    totalSaleValue: {
      title: 'Total Plot Sale Value(A+B)',
      total_A: 8877330,
      total_B: 996011,
      total: 9873341,
    },
    invoiceNumber: '14321',
    charges: [
      {
        id: 1,
        title: 'Legal Charges on sale Deed',
        description: 'Before Sale Deed Execution',
        total: 50000,
      },
      {
        id: 2,
        title: 'Club House Charges',
        description: 'Before SD',
        total: 236000,
      },
      {
        id: 3,
        title: 'Infrastructure charges',
        description: 'Before SD',
        total: 647820,
      },
      {
        id: 4,
        title: 'Maintenance Charges',
        description: 'Before SD',
        total: 62191,
      },
    ],
    chargeTotal: {
      title: 'Total (B)',
      total: 996011,
    },
    items: [
      {
        id: 1,
        title: 'UNIT COST',
        RatePerSqft: 3650,
        SaleValue: 8015400,
        total: 8416170,
        service: 'sell',
        quantity: 2196,
      },
      {
        id: 2,
        title: 'PLC',
        RatePerSqft: 1,
        SaleValue: 2196,
        total: 461160,
        service: 'sell',
        quantity: 2,
      },
    ],
    itemTotal: {
      title: 'Total (A)',
      RatePerSqft: 3651,
      SaleValue: 8017596,
      total: 8877330,
    },
    invoiceTo: {
      id: 2,
      name: 'kunal',
      company: 'ensaar',
      primary: true,
      fullAddress: 'shalimar bagh delhi-110088',
      phoneNumber: '7838103717',
      addressType: 'permanent',
    },
    invoiceFrom: {
      id: 2,
      name: 'kunal',
      company: 'ensaar',
      primary: true,
      fullAddress: 'shalimar bagh',
      phoneNumber: '7838103717',
      addressType: 'permanent',
    },
  },
]
const MyDocument = ({
  user,
  selUnitDetails,
  myObj,
  newPlotPS,
  myAdditionalCharges,
  netTotal,
  projectDetails,
  setNetTotal,
  partATotal,
  partBTotal,
  leadDetailsObj1,
  payementDetails,

  setPartATotal,
  setPartBTotal,
}) => {
  const styles = useStyles()

  useEffect(() => {
    console.log('myObj', myObj, myAdditionalCharges)
  }, [myObj])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.gridContainer,
            // styles.mb10,
            styles.dashBorder,
            styles.cellBgHead,
            styles.headFitter,
          ]}
        >
          <View
            style={[styles.col6, styles.smallFitter, styles.pr3, styles.ml1]}
          >
            <Image source="/ps_logo.png" style={{ width: 85, height: 35 }} />
            <Text style={[styles.h4, styles.ml1]}>
              {projectDetails?.eventName}
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
          <View style={[styles.col6]}>
            <Text
              style={[
                styles.h4,
                styles.alignRight,
                styles.mT1,
                styles.pt5,
                styles.pr3,
              ]}
            >
              Payment Receipt
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
        </View>




        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F5F5F5',
            padding: 30,

          }}
        >
          <View style={{ margin: 10, padding: 10, flexGrow: 1, width: '40%' }}>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}
            >
              Thank you for your Payment!
            </Text>
            <Text style={{ fontSize: 8, marginBottom: 10 }}>
              Your Payment will be processed within 24 hours during working days.
              We will notify you by email about payment status.
            </Text>

            <Text
              style={{
                fontSize: 9,
                fontWeight: 'bold',
                marginTop: 20,

              }}
            >
              Payee Details
            </Text>
            <View style={[ ]}>

            <View style={styles.col8}>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
            Stall No: {selUnitDetails?.unit_no}
            </Text>

            </View>
          </View>

            <Text style={{ fontSize: 12, marginBottom: 5 }}>
              Address: {projectDetails?.address}-{projectDetails?.pincode}
            </Text>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              Owner Name: {selUnitDetails?.customerDetailsObj?.customerName1}
            </Text>
            <Text style={{ fontSize: 12, marginBottom: 5 }}>
              Phone: {selUnitDetails?.customerDetailsObj?.countryCode1} {selUnitDetails?.customerDetailsObj?.phoneNo1}
            </Text>
            <Text style={{ fontSize: 12, marginBottom: 5 }}>
              Email: {selUnitDetails?.customerDetailsObj?.email1}
            </Text>


          </View>

          <View
            style={{
              margin: 10,
              padding: 20,
              flexGrow: 1,
              width: '50%',
              backgroundColor: '#EEEEEE',
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}
            >
              Payment Receipt
            </Text>




{/* section - 2 */}
               <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
                <View>
                   <Text style={{ fontSize: 14, fontWeight: 'bold' }}>₹{payementDetails?.amount?.toLocaleString('en-IN')}</Text>
                   <Text style={{ fontSize: 10 }}>Total Payment</Text>
                </View>
                <View>
                   <Text style={{ fontSize: 10 }}>Review</Text>
                </View>
            </View>

{/* section - 3 */}
<View style={{flexDirection: 'row', justifyContent: 'space-between',
                borderTopWidth: 1,

                borderColor: '#CCCCCC',
                marginTop: 10,
                paddingTop: 10,

                // paddingBottom: 10,
              }}>
                <View style={{border: 0, borderColor: '#CCCCCC', borderRadius: 8, padding: 0, marginTop: 10}}>
                   {payementDetails?.dated == undefined || '' ? null :<Text style={{ fontSize: 10, fontWeight: 'bold' }}> {fDate(prettyDate(payementDetails?.dated))}</Text>}
                   <Text style={{ fontSize: 8 }}>Date</Text>
                </View>
                <View style={{textAlign: 'right',border: 0, borderColor: '#CCCCCC', borderRadius: 8, padding: 0, marginTop: 10}}>
                   <Text style={{textAlign: 'right', fontSize: 10, fontWeight: 'bold' }}> {payementDetails?.bank_ref_no}</Text>
                   <Text style={{ textAlign: 'right',fontSize: 8 }}>Referal Id</Text>
                </View>
                {/* <View>
                   <Text style={{ fontSize: 10, fontWeight: 'bold' }}> {payementDetails?.builderName}</Text>
                   <Text style={{ fontSize: 8 }}>Bank</Text>
                </View> */}

            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',

                // borderBottomWidth: 1,
                // borderColor: '#CCCCCC',


                // marginBottom: 10,
                // paddingBottom: 10,
              }}>
                <View style={{border: 0, borderColor: '#CCCCCC', borderRadius: 8, padding: 0,  marginTop: 10}}>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}> {payementDetails?.builderName}</Text>
                <Text style={{ fontSize: 8 }}>Bank</Text>
                </View>
                <View style={{textAlign: 'right',border: 0, borderColor: '#CCCCCC', borderRadius: 8, padding: 0,  marginTop: 10}}>
                <Text style={{ textAlign: 'right',fontSize: 10, fontWeight: 'bold' }}> {payementDetails?.mode}</Text>
                <Text style={{ textAlign: 'right',fontSize: 8 }}>Mode</Text>
                </View>
                {/* <View>

                </View> */}

            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#CCCCCC',
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 10 }}>Paid for</Text>
                <Text style={{ fontSize: 10 }}>{payementDetails?.payReason}</Text>
              </View>



            </View>
          </View>
        </View>


        <View
          style={[
            styles.gridContainer,
            // styles.mb10,
            // styles.dashBorder,
            styles.cellBgHead,
            styles.headFitter,
            {position: 'absolute', bottom: 0, left: 0, right: 0},
          ]}
        >
          <View
            style={[ styles.smallFitter, styles.pr3, styles.ml1 ,{flexDirection: 'row'}]}
          >
            <Image source="/ps_logo.png" style={{ width: 85, height: 35 }} />
            <Text style={[styles.h4, styles.ml1,      styles.mT1,
                styles.pt5,
                styles.pr3,]}>
              {projectDetails?.eventName}
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
          <View style={[styles.col6]}>
            <Text
              style={[

                styles.alignRight,
                styles.mT1,
                styles.pt5,
                styles.pr3,
              ]}
            >
            {projectDetails?.address}-{projectDetails?.pincode}
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
        </View>
      </Page>
    </Document>
  )
}
const PdfReceiptGenerator = ({
  user,
  selUnitDetails,
  myObj,
  newPlotPS,
  myAdditionalCharges,
  netTotal,
  setNetTotal,
  partATotal,
  partBTotal,
  setPartATotal,
  setPartBTotal,
  projectDetails,
  leadDetailsObj1,
  payementDetails
}) => {
  console.log('overall cost sheet is ', newPlotPS)
  return (
    <div>
      {' '}
      <PDFDownloadLink
        document={
          <MyDocument
            user={user}
            selUnitDetails={selUnitDetails}
            myObj={myObj}
            newPlotPS={newPlotPS}
            myAdditionalCharges={myAdditionalCharges}
            netTotal={netTotal}
            setNetTotal={setNetTotal}
            partATotal={partATotal}
            partBTotal={partBTotal}
            setPartATotal={setPartATotal}
            setPartBTotal={setPartBTotal}
            projectDetails={projectDetails}
            leadDetailsObj1={leadDetailsObj1}
            payementDetails={payementDetails}
          />
        }
        fileName="sample.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <button>Loading document...</button>
          ) : (
            <span
              className="mb-4 md:mb-0 hover:scale-110 focus:outline-none bg-white px-5 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider  text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100         hover:bg-teal-200

            text-blue-700

             duration-200 ease-in-out
             transition"
            >
              Download Receipt
            </span>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}

export default PdfReceiptGenerator
