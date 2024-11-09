import { useState, useEffect } from 'react'

import { ChatBubble, Edit, Flag } from '@mui/icons-material'
import { Box, Card, Divider, Grid, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'src/context/firebase-auth-context'

const TaskProgress = ({ userTodayPerfA }) => {
  // change navbar title

  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <section className="bg-white rounded  flex flex-col p-4 w-100 ">
      <h5>{t('Stall Bookings')}</h5>


      <Box mt={3}>
        <div className="flex flex-row align-middle justify-between">
          <h6 className="font-bodyLato font-semibold text-sm">
            {t('Total')}
          </h6>
          <span className="font-bodyLato text-[12px] text-[#94A4C4]">
            110
          </span>
        </div>
        <LinearProgress
          variant="determinate"
          color="info"
          value={
            100
          }
          style={{
            backgroundColor: '#E5EAF2',
            borderRadius: '3px',
            height: '4px',
          }}
        />
      </Box>

      <Box mt={3}>
        <div className="flex flex-row align-middle justify-between">
          <h6 className="font-bodyLato font-semibold text-sm">
            {t('Available')}
          </h6>
          <span className="font-bodyLato text-[12px] text-[#94A4C4]">
            20
          </span>
        </div>
        <LinearProgress
          variant="determinate"
          color="info"
          value={
            20
          }
          style={{
            backgroundColor: '#E5EAF2',
            borderRadius: '3px',
            height: '4px',
          }}
        />
      </Box>

      <Box mt={3}>
        {/* <FlexBox mb={1} alignItems="center" justifyContent="space-between">
        <h6>{t('Illustrations')}</h6>
        <span color="text.disabled">2/7</span>
      </FlexBox> */}
        <div className="flex flex-row align-middle justify-between">
          <h6 className="font-bodyLato font-semibold text-sm">
            {t('Blocked')}
          </h6>
          <span className="font-bodyLato text-[12px] text-[#94A4C4]">
            60
          </span>
        </div>
        <LinearProgress
          value={
           60
          }
          color="warning"
          variant="determinate"
          style={{
            backgroundColor: '#E5EAF2',
            borderRadius: '3px',
            height: '4px',
            color: '#FFE91F',
          }}
        />
      </Box>

      <Box mt={3}>
        <div className="flex flex-row align-middle justify-between">
          <h6 className="font-bodyLato font-semibold text-sm">
            {t('Booked')}
          </h6>
          <span className="font-bodyLato text-[12px] text-[#94A4C4]">
           30
          </span>
        </div>
        <LinearProgress
          variant="determinate"
          value={
           30
          }
          color="success"
          style={{
            borderRadius: '3px',
            height: '4px',
            color: '#FD396D',
            backgroundColor: '#E5EAF2',
          }}
        />
      </Box>
    </section>
  )
}
export default TaskProgress
