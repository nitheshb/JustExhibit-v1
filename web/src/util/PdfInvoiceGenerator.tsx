import React from 'react'
import { useMemo, useEffect } from 'react'
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'

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
          backgroundColor: '#E8E6FE',
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
          backgroundColor: '#E8E6FE',
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
            styles.mb10,
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
              Cost Sheet
            </Text>
            {/* <Text>{myObj} </Text> */}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb10]}>
          <View
            style={[
              styles.col4,
              styles.ml4,
              styles.cellBgHead,
              styles.AllsmallFitter,
            ]}
          >
            <Text style={[styles.subtitle2, styles.mb4]}>Invoice To</Text>
            <Text style={styles.body2}>{leadDetailsObj1?.Name}</Text>
            <Text style={styles.body2}>{leadDetailsObj1?.Address}</Text>
            <Text style={styles.body2}>{leadDetailsObj1?.Email}</Text>
            <Text style={styles.body2}>{leadDetailsObj1?.Mobile}</Text>
          </View>

          <View style={[styles.col4, styles.cellBgHead, styles.AllsmallFitter]}>
            <Text style={[styles.subtitle2, styles.mb4]}>Invoice From</Text>
            <Text style={styles.body2}>{user?.displayName || user?.name}</Text>
            {/* <Text style={styles.body2}>
              {user?.role[0]}
            </Text> */}
            <Text style={styles.body2}>Phone:{user?.phone}</Text>
            <Text style={styles.body2}>Maa Homes,HSR Layout,</Text>
            <Text style={styles.body2}>Banglore.</Text>
          </View>
          <View style={[styles.col4, styles.cellBgHead, styles.AllsmallFitter]}>
            <View>
              <Text style={[styles.subtitle2, styles.mb2]}>
                Date create:{' '}
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
        <View style={[styles.topBoderRadius, styles.bg1, {  paddingBottom: '16px' }] }>
        {/* <View style={[styles.topBoderRadius, styles.bg1, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 20 }]}> */}

          <View style={[styles.ml4, styles.pt2, styles.mT1]}>
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
{/* part-1 */}
          <View style={[styles.fitter]}>
            <View style={[{ border: '1 solid #e5e7eb ', borderRadius: 8 }]}>
              <View
                style={[
                  styles.subtitle1,
                  styles.bg1,
                  {
                    backgroundColor: '#E8E6FE',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tableHeader,
                    styles.p4,
                    { paddingBottom: '2px' },
                  ]}
                >
                  <View style={[styles.tableCell_1, styles.p11]}>
                    <Text style={styles.subtitle2}></Text>
                  </View>

                  <View style={[styles.tableCell_35, styles.p12]}>
                    <Text style={styles.subtitle2}>
                      {projectDetails?.projectType?.name === 'Apartment'
                        ? 'Flat'
                        : 'Stall'}{' '}
                      Particulars
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Rate/Sqft</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Cost</Text>
                  </View>

                  <View
                        style={[
                          styles.tableCell_20,
                          styles.alignRight,
                          styles.p12,
                          styles.pr4,
                        ]}
                  >
                    <Text style={styles.subtitle2}>GST</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.p12]}
                  >
                    <Text style={styles.subtitle2}>Total</Text>
                  </View>
                </View>
              </View>
              <View>
                {myObj?.map((item, index) => (
                  <View
                    style={[
                      styles.tableRow,
                      index + 1 != myObj.length ? styles.borderbottom : null,

                      // {
                      //   backgroundColor:
                      //     index % 2 === 0 ? '#ffffff' : '#ffffff',
                      // },
                      { marginTop: '2px', paddingTop: '4px' },
                    ]}
                    key={item.id}
                  >
                    <View
                      style={[
                        styles.tableCell_1,
                        styles.pl2,
                        { marginTop: '-1px' },
                      ]}
                    >
                      <Text>{index + 1}</Text>
                    </View>

                    <View style={[styles.tableCell_35]}>
                      <Text style={styles.subtitle2}>
                        {item?.component?.label}
                      </Text>
                    </View>

                    <View style={[styles.tableCell_20, styles.alignRight]}>
                      <Text>{item?.charges}</Text>
                    </View>

                    <View
                      style={[
                        styles.tableCell_20,
                        styles.alignRight,
                        styles.pr4,
                      ]}
                    >
                      <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                    </View>

                    <View style={[styles.tableCell_20, styles.alignRight]}>
                      <Text>{fCurrency(item?.TotalNetSaleValueGsT)}</Text>
                    </View>
                  </View>
                ))}

                {/* part 2 */}
              </View>



              
            <View  style={[styles.totalRow, styles.mT0]}>
              <View style={styles.tableCell_1}></View>

              <View style={[styles.tableCell_35, styles.p10]}></View>

              <View style={[styles.tableCell_20, styles.alignRight]}></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>{projectDetails?.projectType?.name === 'Apartment'
                        ? 'Flat'
                        : 'Stall'} Cost</Text>
              </View>

              <View
                style={[styles.tableCell_3, styles.alignRight]}
              >
                <Text>{fCurrency(partATotal)}</Text>
              </View>
            </View>





            </View>
            
{/* 
            <View
              style={[styles.tableRow, { marginTop: '2px', paddingTop: '4px' }]}
            >
              <View style={[styles.tableCell_1, styles.pl2, styles.p10]}></View>

              <View style={[styles.tableCell_35, styles.p10]}></View>

              <View style={[styles.tableCell_20, styles.alignRight]}></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>{projectDetails?.projectType?.name === 'Apartment'
                        ? 'Flat'
                        : 'Plot'} Cost</Text>
              </View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pt2]}
              >
                <Text>{fCurrency(partATotal)}</Text>
              </View>
            </View> */}



            {/* <View  style={[styles.totalRow, styles.mT0]}>
              <View style={styles.tableCell_1}></View>

              <View style={[styles.tableCell_35, styles.p10]}></View>

              <View style={[styles.tableCell_20, styles.alignRight]}></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>{projectDetails?.projectType?.name === 'Apartment'
                        ? 'Flat'
                        : 'Stall'} Cost</Text>
              </View>

              <View
                style={[styles.tableCell_3, styles.alignRight]}
              >
                <Text>{fCurrency(partATotal)}</Text>
              </View>
            </View> */}
           
          </View>
          {/* Part-1-end */}
          {/* part -2 */}
          {/* <View style={[styles.fitter, { marginTop: '10px' }]}>
            <View style={[{ border: '1 solid #e5e7eb ', borderRadius: 8 }]}>
              <View
                style={[
                  styles.subtitle1,
                  styles.bg1,
                  {
                    backgroundColor: '#E8E6FE',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tableHeader,
                    styles.p4,
                    { paddingBottom: '2px' },
                  ]}
                >
                  <View style={[styles.tableCell_1, styles.p11]}>
                    <Text style={styles.subtitle2}></Text>
                  </View>

                  <View style={[styles.tableCell_35, styles.p12]}>
                    <Text style={styles.subtitle2}>
                      Additional Charges
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Rate/Sqft</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Cost</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.p12]}
                  >
                    <Text style={styles.subtitle2}>Total Inc GST</Text>
                  </View>
                </View>
              </View>
              {myAdditionalCharges?.map((item, index) => (
                <View
                  style={[
                    styles.tableRow,
                    styles.ml1,
                    index + 1 != myAdditionalCharges.length
                      ? styles.borderbottom
                      : null,

                    { marginTop: '2px', paddingTop: '4px' },
                  ]}
                  key={item.id}
                >
                  <View
                    style={[
                      styles.tableCell_1,
                      styles.pl2,
                      { marginTop: '-1px' },
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>

                  <View style={[styles.tableCell_35]}>
                    <Text style={styles.subtitle2}>
                      {item?.component?.label}
                    </Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>{fCurrency(item?.charges)}</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                  >
                    <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>
                      {' '}
                      {fCurrency(
                        Number(
                          computeTotal(
                            item,
                            selUnitDetails?.area?.toString()?.replace(',', '')
                          )
                        )?.toLocaleString('en-IN')
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <View
                style={[
                  styles.tableRow,
                  { marginTop: '2px', paddingTop: '8px' },
                ]}
              >
                <View
                  style={[styles.tableCell_1, styles.pl2, styles.p10]}
                ></View>

                <View style={[styles.tableCell_35, styles.p10]}></View>

                <View style={[styles.tableCell_20, styles.alignRight]}></View>

                <View
                  style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                >
                  <Text style={[styles.subtitle2]}>Additonal Charges</Text>
                </View>

                <View style={[styles.tableCell_20, styles.alignRight]}>
                  <Text>{fCurrency(partBTotal)}</Text>
                </View>
              </View>


            </View>
          </View> */}
          {/* part-3 */}
          {projectDetails?.projectType?.name === 'Villas' &&
          <View style={[styles.fitter]}>
            <View style={[{ border: '1 solid #e5e7eb ', borderRadius: 8 }]}>
              <View
                style={[
                  styles.subtitle1,
                  styles.bg1,
                  {
                    backgroundColor: '#E8E6FE',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tableHeader,
                    styles.p4,
                    { paddingBottom: '2px' },
                  ]}
                >
                  <View style={[styles.tableCell_1, styles.p11]}>
                    <Text style={styles.subtitle2}></Text>
                  </View>

                  <View style={[styles.tableCell_35, styles.p12]}>
                    <Text style={styles.subtitle2}>

                     Construction Particulars
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Rate/Sqft</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Cost</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.p12]}
                  >
                    <Text style={styles.subtitle2}>Total Inc GST</Text>
                  </View>
                </View>
              </View>
              <View>
                {selUnitDetails?.constructCS?.map((item, index) => (
                  <View
                    style={[
                      styles.tableRow,
                      index + 1 != myObj.length ? styles.borderbottom : null,

                      // {
                      //   backgroundColor:
                      //     index % 2 === 0 ? '#ffffff' : '#ffffff',
                      // },
                      { marginTop: '2px', paddingTop: '4px' },
                    ]}
                    key={item.id}
                  >
                    <View
                      style={[
                        styles.tableCell_1,
                        styles.pl2,
                        { marginTop: '-1px' },
                      ]}
                    >
                      <Text>{index + 1}</Text>
                    </View>

                    <View style={[styles.tableCell_35]}>
                      <Text style={styles.subtitle2}>
                        {item?.component?.label}
                      </Text>
                    </View>

                    <View style={[styles.tableCell_20, styles.alignRight]}>
                      <Text>{item?.charges}</Text>
                    </View>

                    <View
                      style={[
                        styles.tableCell_20,
                        styles.alignRight,
                        styles.pr4,
                      ]}
                    >
                      <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                    </View>

                    <View style={[styles.tableCell_20, styles.alignRight]}>
                      <Text>{fCurrency(item?.TotalNetSaleValueGsT)}</Text>
                    </View>
                  </View>
                ))}

                {/* part 2 */}
              </View>
            </View>
            <View
              style={[styles.tableRow, { marginTop: '2px', paddingTop: '4px' }]}
            >
              <View style={[styles.tableCell_1, styles.pl2, styles.p10]}></View>

              <View style={[styles.tableCell_35, styles.p10]}></View>

              <View style={[styles.tableCell_20, styles.alignRight]}></View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
              >
                <Text style={[styles.subtitle2, styles.pt2]}>Construction Cost</Text>
              </View>

              <View
                style={[styles.tableCell_20, styles.alignRight, styles.pt2]}
              >
                <Text>{fCurrency(selUnitDetails?.T_C)}</Text>
              </View>
            </View>
          </View>}
          {/* part -4 */}
          {projectDetails?.projectType?.name === 'Villas' &&
           <View style={[styles.fitter, { marginTop: '10px' }]}>
            <View style={[{ border: '1 solid #e5e7eb ', borderRadius: 8 }]}>
              <View
                style={[
                  styles.subtitle1,
                  styles.bg1,
                  {
                    backgroundColor: '#E8E6FE',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tableHeader,
                    styles.p4,
                    { paddingBottom: '2px' },
                  ]}
                >
                  <View style={[styles.tableCell_1, styles.p11]}>
                    <Text style={styles.subtitle2}></Text>
                  </View>

                  <View style={[styles.tableCell_35, styles.p12]}>
                    <Text style={styles.subtitle2}>
                      Construction Additonal Charges
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Rate/Sqft</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Cost</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.p12]}
                  >
                    <Text style={styles.subtitle2}>Total Inc GST</Text>
                  </View>
                </View>
              </View>
              {selUnitDetails?.constAdditionalChargesCS?.map((item, index) => (
                <View
                  style={[
                    styles.tableRow,
                    styles.ml1,
                    index + 1 != myAdditionalCharges.length
                      ? styles.borderbottom
                      : null,

                    { marginTop: '2px', paddingTop: '4px' },
                  ]}
                  key={item.id}
                >
                  <View
                    style={[
                      styles.tableCell_1,
                      styles.pl2,
                      { marginTop: '-1px' },
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>

                  <View style={[styles.tableCell_35]}>
                    <Text style={styles.subtitle2}>
                      {item?.component?.label}
                    </Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>{fCurrency(item?.charges)}</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                  >
                    <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>
                      {' '}
                      {fCurrency(
                        Number(
                          computeTotal(
                            item,
                            selUnitDetails?.area?.toString()?.replace(',', '')
                          )
                        )?.toLocaleString('en-IN')
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <View
                style={[
                  styles.tableRow,
                  { marginTop: '2px', paddingTop: '8px' },
                ]}
              >
                <View
                  style={[styles.tableCell_1, styles.pl2, styles.p10]}
                ></View>

                <View style={[styles.tableCell_35, styles.p10]}></View>

                <View style={[styles.tableCell_20, styles.alignRight]}></View>

                <View
                  style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                >
                  <Text style={[styles.subtitle2]}>Additonal Charges</Text>
                </View>

                <View style={[styles.tableCell_20, styles.alignRight]}>
                  <Text>{fCurrency(selUnitDetails?.T_D)}</Text>
                </View>
              </View>
            </View>
          </View>}
          {/* part -5 */}
          {selUnitDetails?.possessionAdditionalCostCS?.length >0 &&
           <View style={[styles.fitter, { marginTop: '10px' }]}>
            <View style={[{ border: '1 solid #e5e7eb ', borderRadius: 8 }]}>
              <View
                style={[
                  styles.subtitle1,
                  styles.bg1,
                  {
                    backgroundColor: '#E8E6FE',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tableHeader,
                    styles.p4,
                    { paddingBottom: '2px' },
                  ]}
                >
                  <View style={[styles.tableCell_1, styles.p11]}>
                    <Text style={styles.subtitle2}></Text>
                  </View>

                  <View style={[styles.tableCell_35, styles.p12]}>
                    <Text style={styles.subtitle2}>
                      Possession Charges
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Rate/Sqft</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell_20,
                      styles.alignRight,
                      styles.p12,
                      styles.pr4,
                    ]}
                  >
                    <Text style={styles.subtitle2}>Cost</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.p12]}
                  >
                    <Text style={styles.subtitle2}>Total Inc GST</Text>
                  </View>
                </View>
              </View>
              {selUnitDetails?.constAdditionalChargesCS?.map((item, index) => (
                <View
                  style={[
                    styles.tableRow,
                    styles.ml1,
                    index + 1 != myAdditionalCharges.length
                      ? styles.borderbottom
                      : null,

                    { marginTop: '2px', paddingTop: '4px' },
                  ]}
                  key={item.id}
                >
                  <View
                    style={[
                      styles.tableCell_1,
                      styles.pl2,
                      { marginTop: '-1px' },
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>

                  <View style={[styles.tableCell_35]}>
                    <Text style={styles.subtitle2}>
                      {item?.component?.label}
                    </Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>{fCurrency(item?.charges)}</Text>
                  </View>

                  <View
                    style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                  >
                    <Text>{fCurrency(item?.TotalSaleValue)}</Text>
                  </View>

                  <View style={[styles.tableCell_20, styles.alignRight]}>
                    <Text>
                      {' '}
                      {fCurrency(
                        Number(
                          computeTotal(
                            item,
                            selUnitDetails?.area?.toString()?.replace(',', '')
                          )
                        )?.toLocaleString('en-IN')
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <View
                style={[
                  styles.tableRow,
                  { marginTop: '2px', paddingTop: '8px' },
                ]}
              >
                <View
                  style={[styles.tableCell_1, styles.pl2, styles.p10]}
                ></View>

                <View style={[styles.tableCell_35, styles.p10]}></View>

                <View style={[styles.tableCell_20, styles.alignRight]}></View>

                <View
                  style={[styles.tableCell_20, styles.alignRight, styles.pr4]}
                >
                  <Text style={[styles.subtitle2]}>Possession Charges</Text>
                </View>

                <View style={[styles.tableCell_20, styles.alignRight]}>
                  <Text>{fCurrency(selUnitDetails?.T_E)}</Text>
                </View>
              </View>

              {/* summary section */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    border: '1 solid #e5e7eb ',
                    borderRadius: 8,
                    paddingTop: 10,
                    minWidth: 180,
                    // Adjust as needed
                  }}
                >
                  {[
                    { label: `${projectDetails?.projectType?.name === 'Apartment'
                      ? 'Flat'
                      : 'Plot'} cost`, value: selUnitDetails?.T_A },
                    { label: 'Additional Charges', value: partBTotal },
                  ].map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 9, fontWeight: 'normal' }}>
                        {item.label}
                      </Text>
                      <Text style={{ fontSize: 9, fontWeight: 'semibold' }}>
                        ₹{item.value?.toLocaleString('en-IN')}
                      </Text>
                    </View>
                  ))}
                  {/* part c and D */}
                  {projectDetails?.projectType?.name === 'Villas' &&
                        [
                    { label: `Construction cost`, value: selUnitDetails?.T_C },
                    { label: 'Construction additional Charges', value: selUnitDetails?.T_D },
                  ].map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 9, fontWeight: 'normal' }}>
                        {item.label}
                      </Text>
                      <Text style={{ fontSize: 9, fontWeight: 'semibold' }}>
                        ₹{item.value?.toLocaleString('en-IN')}
                      </Text>
                    </View>
                  ))}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#E8E6FE',
                      padding: 8,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                    }}
                  >
                    <Text style={{ fontSize: 9, fontWeight: 'medium' }}>
                      Total Cost
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: 'medium',
                        color: '#0D027D',
                        marginRight: 2,
                      }}
                    >
                      ₹{netTotal?.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </View>}

             {/*Payment Schedule  */}

             {/* <View style={[styles.ml4, styles.pt2, styles.mT1]}>
            <Text
              style={[
                styles.subtitle1,
                styles.mb5,
                styles.col,
                styles.smallFitter,
                styles.ml2,
              ]}
            >
              Payment Schedule change
            </Text>
          </View> */}
          {/* <View style={[styles.fitter]}>
              <View
                style={[
                  { border: '1 solid #e5e7eb ', borderRadius: 8 },
                  styles.mb20,
                ]}
              >
                <View
                  style={[
                    styles.subtitle1,
                    {
                      backgroundColor: '#E8E6FE',
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.tableHeader,
                      styles.p4,
                      { paddingBottom: '2px' },
                    ]}
                  >
                    <View style={[styles.tableCell_1, styles.p11]}>
                      <Text style={styles.subtitle2}></Text>
                    </View>

                    <View style={[styles.tableCell_4, styles.p12]}>
                      <Text style={[styles.subtitle2]}>Schedule</Text>
                    </View>
                    <View style={[styles.tableCell_5, styles.p12]}>
                      <Text style={styles.subtitle2}>Payment Timeline</Text>
                    </View>
                    <View
                      style={[
                        styles.tableCell_3,
                        styles.alignRight,
                        styles.p12,
                      ]}
                    >
                      <Text style={styles?.subtitle2}>Total</Text>
                    </View>
                  </View>
                </View>
                {selUnitDetails?.plotPS?.map((item, index) => (
                  <View
                    style={[
                      styles.tableRow,
                      styles.borderbottom,
                      { marginTop: '2px', paddingTop: '4px' },
                    ]}
                    key={item.id}
                  >
                    <View
                      style={[
                        styles.tableCell_1,
                        styles.pl2,
                        { marginTop: '-1px' },
                      ]}
                    >
                      <Text>{index + 1}</Text>
                    </View>

                    <View style={styles.tableCell_4}>
                      <Text style={styles.subtitle2}>{item.stage?.label}</Text>
                    </View>

                    <View style={styles.tableCell_5}>
                      <Text>{item.description}</Text>
                    </View>

                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(item.value)}</Text>
                    </View>
                  </View>
                ))}
                <View style={[styles.totalRow, styles.mT0]}>
                  <View style={styles.tableCell_1}></View>

                  <View style={[styles.tableCell_4]}>
                    <Text style={styles.subtitle2}>Total Cost</Text>
                  </View>

                  <View style={styles.tableCell_3}></View>

                  <View style={styles.tableCell_3}></View>

                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{fCurrency(selUnitDetails?.T_A + selUnitDetails?.T_B)}</Text>
                  </View>
                </View>
              </View>

              {projectDetails?.projectType?.name === 'Villas' &&  <View
                style={[
                  { border: '1 solid #e5e7eb ', borderRadius: 8 },
                  styles.mb20,
                ]}
              >
                <View
                  style={[
                    styles.subtitle1,
                    {
                      backgroundColor: '#E8E6FE',
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.tableHeader,
                      styles.p4,
                      { paddingBottom: '2px' },
                    ]}
                  >
                    <View style={[styles.tableCell_1, styles.p11]}>
                      <Text style={styles.subtitle2}></Text>
                    </View>

                    <View style={[styles.tableCell_4, styles.p12]}>
                      <Text style={[styles.subtitle2]}>Construction Schedule</Text>
                    </View>
                    <View style={[styles.tableCell_5, styles.p12]}>
                      <Text style={styles.subtitle2}>Payment Timeline</Text>
                    </View>
                    <View
                      style={[
                        styles.tableCell_3,
                        styles.alignRight,
                        styles.p12,
                      ]}
                    >
                      <Text style={styles?.subtitle2}>Total</Text>
                    </View>
                  </View>
                </View>
                {selUnitDetails?.constructPS?.map((item, index) => (
                  <View
                    style={[
                      styles.tableRow,
                      styles.borderbottom,
                      { marginTop: '2px', paddingTop: '4px' },
                    ]}
                    key={item.id}
                  >
                    <View
                      style={[
                        styles.tableCell_1,
                        styles.pl2,
                        { marginTop: '-1px' },
                      ]}
                    >
                      <Text>{index + 1}</Text>
                    </View>

                    <View style={styles.tableCell_4}>
                      <Text style={styles.subtitle2}>{item.stage?.label}</Text>
                    </View>

                    <View style={styles.tableCell_5}>
                      <Text>{item.description}</Text>
                    </View>

                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(item.value)}</Text>
                    </View>
                  </View>
                ))}
                <View style={[styles.totalRow, styles.mT0]}>
                  <View style={styles.tableCell_1}></View>

                  <View style={[styles.tableCell_4]}>
                    <Text style={styles.subtitle2}>Total Cost</Text>
                  </View>

                  <View style={styles.tableCell_3}></View>

                  <View style={styles.tableCell_3}></View>

                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{fCurrency(selUnitDetails?.T_C + selUnitDetails?.T_D)}</Text>
                  </View>
                </View>
              </View> }
              </View> */}
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
const PdfInvoiceGenerator = ({
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
          />
        }
        fileName="sample.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <button>Loading document...</button>
          ) : (
            <span
              className="mb-4 md:mb-0 underline hover:scale-110 focus:outline-none bg-white px-1 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider rounded-sm hover:shadow-lg hover:bg-gray-100         hover:bg-teal-200

            text-blue-700

             duration-200 ease-in-out
             transition"
            >
          <DownloadTwoToneIcon style={{ height: '20px', width: '20px' }} />
          Download Cost Sheet
            </span>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}

export default PdfInvoiceGenerator
