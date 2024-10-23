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

import { computeTotal } from '../computeCsTotals'
import { prettyDate } from '../dateConverter'

// import { computeTotal } from './computeCsTotals'
// import { prettyDate } from './dateConverter'

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
        p10: { padding: '4px 6px' },
        p11: { padding: '0px 0px' },
        p12: { paddingTop: '4px', paddingBottom: '2px' },
        pr0: { paddingRight: '0px' },
        pr4: { paddingRight: '4px' },
        mb4: { marginBottom: 4 },
        mb2: { marginBottom: 2 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        mb30: { marginBottom: 30 },
        mb20: { marginBottom: 20 },
        mb10: { marginBottom: 10 },
        mb5: { marginBottom: 5 },
        mT0: { marginTop: 0 },
        mT1: { marginTop: 10 },
        ml1: { marginLeft: 5 },
        ml2: { marginLeft: 10 },
        mr2: { marginRight: 10, paddingRight: 10 },
        ml4: { marginLeft: 20 },
        ml5: { marginLeft: 30 },
        pl1: { paddingLeft: 5 },
        pl2: { paddingLeft: 10 },
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
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 60px 24px',
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
        table: {
          display: 'flex',
          width: 'auto',
        },
        tableRow: {
          padding: '8px 0',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
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
          backgroundColor: '#fff3d2',
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
  myAdditionalCharges,
  netTotal,
  projectDetails,
  setNetTotal,
  partATotal,
  partBTotal,
  leadDetailsObj1,

  setPartATotal,
  setPartBTotal,
}) => {
  const styles = useStyles()

  useEffect(() => {
    console.log('myObj', selUnitDetails)
    console.log('myObj', selUnitDetails?.plotCS, partATotal)
    console.log('myObj', myObj, myAdditionalCharges)
  }, [myObj])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.gridContainer,
            styles.mb20,
            styles.fitter,
            styles.borderbottom,
          ]}
        >
          <View style={[styles.col6]}>
            <Image source="/ps_logo.png" style={{ width: 85, height: 35 }} />
            <Text style={[styles.h4, styles.ml1]}>
              {projectDetails?.eventName}
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
          <View style={[styles.col6]}>
            <Text
              style={[styles.h4, styles.alignRight, styles.mT1, styles.pt5]}
            >
              Cost Sheet
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb20]}>
          <View style={[styles.col4, styles.ml4]}>
            <Text style={[styles.subtitle2, styles.mb4]}>
              Customer Name
            </Text>
            <Text style={styles.body2}>{selUnitDetails?.customerDetailsObj?.customerName1}</Text>
            {/* <Text style={styles.body2}>{selUnitDetails?.customerDetailsObj?.customerName1}</Text> */}
            <Text style={styles.body2}>{selUnitDetails?.customerDetailsObj?.email1}</Text>
            <Text style={styles.body2}>{selUnitDetails?.customerDetailsObj?.phoneNo1}</Text>
          </View>

          <View style={styles.col4}>
            <Text style={[styles.subtitle2, styles.mb4]}>Issued By</Text>
            <Text style={styles.body2}>{user?.displayName || user?.name}</Text>
            {/* <Text style={styles.body2}>
              {user?.role[0]}
            </Text> */}
            <Text style={styles.body2}>Phone:{user?.phone}</Text>
            <Text style={styles.body2}>Maa Homes,HSR Layout,</Text>
            <Text style={styles.body2}>Banglore.</Text>
          </View>
          <View style={styles.col4}>
            <View>
              <Text style={[styles.subtitle2, styles.mb2]}>
                Date:{' '}
                <Text style={styles.body2}>
                  {fDate(prettyDate(Timestamp.now().toMillis()))}
                </Text>
              </Text>
            </View>
            <View style={styles.col8}>
              <Text style={[styles.subtitle2, styles.mb2]}>
                Stall No:{' '}
                <Text style={styles.body2}>{selUnitDetails?.unit_no}</Text>
              </Text>
              <Text style={[styles.subtitle2, styles.mb2]}>
                Size:{' '}
                <Text style={styles.body2}>
                  {selUnitDetails?.size}
                  <Text style={styles.body2}>
                    {'('}
                    {selUnitDetails?.area}sqft{')'}
                  </Text>
                </Text>
              </Text>
              <Text style={[styles.subtitle2, styles.mb2]}>
                Facing:{' '}
                <Text style={styles.body2}>{selUnitDetails?.facing}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Date create</Text>
            <Text style={styles.body2}>
              {fDate(invoiceDet[i].createDate)}
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Due date</Text>
            <Text style={styles.body2}>{fDate(invoiceDet[i].dueDate)}</Text>
          </View>
        </View> */}
        <View style={styles.ml4}>
          <Text
            style={[
              styles.subtitle1,
              styles.mb5,
              styles.col,
              styles.smallFitter,
              styles.ml2,
            ]}
          >
            Cost Sheet
          </Text>
        </View>
        <View style={[styles.subtitle1, styles.bg1, styles.fitter, styles.ml2]}>
          <View style={[styles.bg2, styles.cellBgHead, styles.p11]}>
            <View style={[styles.tableCell_1, styles.p11]}>
              <Text style={styles.subtitle2}></Text>
            </View>

            <View style={[styles.tableCell_35, styles.p12]}>
              <Text style={styles.subtitle2}>PARTICULARS</Text>
            </View>

            <View
              style={[
                styles.tableCell_20,
                styles.alignRight,
                styles.p12,
                styles.pr4,
              ]}
            >
              <Text style={styles.subtitle2}>RATE/SQFT</Text>
            </View>

            <View
              style={[
                styles.tableCell_20,
                styles.alignRight,
                styles.p12,
                styles.pr4,
              ]}
            >
              <Text style={styles.subtitle2}>SALE VALUE</Text>
            </View>

            <View
              style={[
                styles.tableCell_20,
                styles.alignRight,
                styles.p12,
                styles.pr4,
              ]}
            >
              <Text style={styles.subtitle2}>TOTAL</Text>
            </View>
          </View>
        </View>
        <View style={[styles.fitter]}>
          <View>
            {selUnitDetails?.plotCS?.map((item, index) => (
              <View style={styles.totalRowNew} key={item.id}>
                <View
                  style={[
                    styles.tableCell_1,
                    styles.pl2,
                    styles.p10,
                    styles.cellBg0,
                  ]}
                >
                  <Text>{index + 1}</Text>
                </View>

                <View style={[styles.tableCell_35, styles.p10, styles.cellBg0]}>
                  <Text style={styles.subtitle2}>{item?.component?.label}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg1,
                    styles.p10,
                  ]}
                >
                  <Text>{item?.charges}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg2,
                    styles.p10,
                  ]}
                >
                  <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg3,
                    styles.p10,
                  ]}
                >
                  <Text>{fCurrency(item?.TotalNetSaleValueGsT)}</Text>
                </View>
              </View>
            ))}
            <View style={styles.totalRowNew}>
              <View style={[styles.tableCell_1, styles.pl2, styles.p10]}></View>

              <View style={[styles.tableCell_35, styles.p10]}></View>

              <View style={[styles.tableCell_20, styles.alignRight]}></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>Total (A)</Text>
              </View>

              <View
                style={[
                  styles.tableCell_20,
                  styles.alignRight,
                  styles.cellBg3,
                  styles.p10,
                  styles.pt2,
                ]}
              >
                <Text>
                  {fCurrency(partATotal)}{' '}
                  {selUnitDetails?.plotCS?.reduce(
                    (partialSum, obj) =>
                      partialSum + Number(obj?.TotalNetSaleValueGsT),
                    0
                  )}
                </Text>
              </View>
            </View>

            {/* part 2 */}
            {selUnitDetails?.addChargesCS?.map((item, index) => (
              <View style={styles.totalRowNew} key={item.id}>
                <View
                  style={[
                    styles.tableCell_1,
                    styles.pl2,
                    styles.p10,
                    styles.cellBg0,
                  ]}
                >
                  <Text>
                    {(selUnitDetails?.plotCS?.length || 0) + (index + 1)}
                  </Text>
                </View>

                <View style={[styles.tableCell_35, styles.p10, styles.cellBg0]}>
                  <Text style={styles.subtitle2}>{item?.component?.label}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg1,
                    styles.p10,
                  ]}
                >
                  <Text>{item?.charges}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg2,
                    styles.p10,
                  ]}
                >
                  <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell_20,
                    styles.alignRight,
                    styles.cellBg3,
                    styles.p10,
                  ]}
                >
                  <Text>
                    {' '}
                    {fCurrency(
                      Number(
                        computeTotal(item, selUnitDetails?.area?.toString()?.replace(',', ''))
                      )?.toLocaleString('en-IN')
                    )}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.totalRowNew}>
              <View
                style={[
                  styles.tableCell_1,
                  styles.pl2,
                  styles.p10,
                  styles.cellBg0,
                ]}
              ></View>

              <View
                style={[styles.tableCell_35, styles.p10, styles.cellBg0]}
              ></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.cellBg1]}
              ></View>

              <View
                style={[
                  styles.tableCell_20,
                  styles.alignRight,
                  styles.cellBg2,
                  styles.pr4,
                ]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>Total (B)</Text>
              </View>

              <View
                style={[
                  styles.tableCell_20,
                  styles.alignRight,
                  styles.cellBg3,
                  styles.p10,
                  styles.pt2,
                ]}
              >
                <Text>
                  {fCurrency(partBTotal)}
                  {selUnitDetails?.addChargesCS?.reduce(
                    (partialSum, obj) =>
                      partialSum +
                      Number(
                        computeTotal(
                          obj,
                          selUnitDetails?.super_built_up_area ||
                            selUnitDetails?.area?.toString()?.replace(',', '')
                        )
                      ),
                    0
                  )}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.totalRow,
                styles.mb20,
                styles.mT0,
                styles.cellBgHead,
              ]}
            >
              <View style={styles.tableCell_1}></View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Total Plot Cost (A+B)</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text>
                  {fCurrency(partATotal)}
                  {selUnitDetails?.plotCS?.reduce(
                    (partialSum, obj) =>
                      partialSum + Number(obj?.TotalNetSaleValueGsT),
                    0
                  )}

                </Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignCenter]}>
                <Text>+</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text>
                  {fCurrency(partBTotal)}
                  {selUnitDetails?.addChargesCS?.reduce(
                    (partialSum, obj) =>
                      partialSum +
                      Number(
                        computeTotal(
                          obj,
                          selUnitDetails?.super_built_up_area ||
                            selUnitDetails?.area?.toString()?.replace(',', '')
                        )
                      ),
                    0
                  )}
                </Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight, styles.pr4]}>
                <Text>
                  {fCurrency(netTotal)}
                  {selUnitDetails?.plotCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),0) + selUnitDetails?.addChargesCS?.reduce(
                    (partialSum, obj) =>
                      partialSum +
                      Number(
                        computeTotal(
                          obj,
                          selUnitDetails?.super_built_up_area ||
                            selUnitDetails?.area?.toString()?.replace(',', '')
                        )
                      ),
                    0
                  )}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.subtitle1,
                styles.mb5,
                styles.col,

                styles.smallFitter,
              ]}
            >
              Payment Schedule
            </Text>

            <View style={[styles.subtitle1, styles.cellBgHead]}>
              <View style={[styles.bg2, styles.cellBgHead]}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}></Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={[styles.subtitle2, styles.ml1]}>Schedule</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Elgible</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>Received</Text>
                </View>
              </View>
            </View>
            {selUnitDetails?.fullPs?.map((item, index) => (
              <View style={[styles.tableRow, styles.ml1]} key={item.id}>
                <View style={[styles.tableCell_1, styles.pl2]}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.subtitle2}>{item?.stage?.label}</Text>
                  <Text>{item?.description}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item?.elgible ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{fCurrency(item?.value)}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{index===0 ? fCurrency(item?.T_review) : '₹0'}</Text>
                </View>
              </View>
            ))}
            <View style={[styles.totalRow, styles.cellBgHead, styles.mT0]}>
              <View style={styles.tableCell_1}></View>

              <View style={[styles.tableCell_4, styles.ml1]}>
                <Text style={styles.subtitle2}>Total Plot Cost</Text>
              </View>

              <View style={styles.tableCell_3}></View>

              <View style={styles.tableCell_3}></View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{selUnitDetails?.plotCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),0) + selUnitDetails?.addChargesCS?.reduce(
                    (partialSum, obj) =>
                      partialSum +
                      Number(
                        computeTotal(
                          obj,
                          selUnitDetails?.super_built_up_area ||
                            selUnitDetails?.area?.toString()?.replace(',', '')
                        )
                      ),
                    0
                  )}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={[styles.gridContainer, styles.footer]} fixed>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text style={{ fontSize: 9 }}>
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text style={{ fontSize: 9 }}>support@abcapp.com</Text>
          </View>
        </View> */}
      </Page>
    </Document>
  )
}
const PdfUnitSummaryFile = ({
  user,
  selUnitDetails,
  myObj,
  myAdditionalCharges,
  netTotal,
  setNetTotal,
  partATotal,
  partBTotal,
  setPartATotal,
  setPartBTotal,
  projectDetails,
  leadDetailsObj1,
}) => {
  return (
    <div>
      {' '}
      <PDFDownloadLink
        document={
          <MyDocument
            user={user}
            selUnitDetails={selUnitDetails}
            myObj={myObj}
            myAdditionalCharges={myAdditionalCharges}
            netTotal={netTotal}
            setNetTotal={setNetTotal}
            partATotal={partATotal}
            partBTotal={partBTotal}
            setPartATotal={setPartATotal}
            setPartBTotal={setPartBTotal}
            projectDetails={projectDetails}
            leadDetailsObj1={leadDetailsObj1}
          />
        }
        fileName="sample.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <button>Loading document...</button>
          ) : (
            <span className='flex flex-row text-blue-500 text-xs cursor-pointer hover:underline'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 pr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span className="text-[11px]">CUSTOMER SUMMARY</span>
                </span>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}

export default PdfUnitSummaryFile
