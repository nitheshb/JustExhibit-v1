/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAuth } from 'src/context/firebase-auth-context'
import { auth } from 'src/context/firebaseConfig'
import { logout as logoutAction } from 'src/state/actions/user'
import ModuleSwitchDrop from '../A_SideMenu/modulesSwitchDrop'

const HeadNavBar2 = ({ selModule, setSelModule, setViewable }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [filteredUnits, setFilteredUnits] = useState([])

  const { user, logout } = useAuth()
  const dispatch = useDispatch()
  const makeFilterFun = (id, viewModule) => {
    // ''Marketing','Registration', 'Stalls', 'Legal', 'Finance', 'HR'
    setSelModule(viewModule)
    console.log('i was clicked', id, viewModule)
  }
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'Logout') {
      await logout()
      dispatch(logoutAction())
    }
  }
  const openUserAccount = () => {
    handleClose(null)
    setViewable('userProfile')
  }

  return (
    <div className=''>
<div
  className="flex items-center flex-shrink-0 h-14 px-2 pl-0 bg-white"
  style={{ boxShadow: '0px 0px 23.2px 0px #0000001F' }}
>
        <span
          style={{  }}
          className="relative z-10 flex items-center text-md font-extrabold ml-4 gap-3 leading-none text-black select-none pl-0 ml-4 "
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C27.9498 0 31.9247 0.000162074 34.7959 1.87988C36.1207 2.74731 37.2527 3.87925 38.1201 5.2041C39.9998 8.07531 40 12.0502 40 20C40 27.9498 39.9998 31.9247 38.1201 34.7959C37.2527 36.1207 36.1207 37.2527 34.7959 38.1201C31.9247 39.9998 27.9498 40 20 40C12.0502 40 8.07531 39.9998 5.2041 38.1201C3.87925 37.2527 2.74731 36.1207 1.87988 34.7959C0.000162074 31.9247 0 27.9498 0 20C0 12.0502 0.000162438 8.07531 1.87988 5.2041C2.74731 3.87925 3.87925 2.74731 5.2041 1.87988C8.07531 0.000162438 12.0502 0 20 0ZM23.123 8.01074C20.937 7.35954 18.5663 7.67379 16.4951 8.70508C12.8176 10.5363 10.0301 14.5934 9.91504 20.1689C8.61077 19.9683 7.48322 19.6185 6.6123 19.1436C5.53835 18.5579 4.17802 18.9281 3.57422 19.9697C2.97056 21.0114 3.35188 22.3304 4.42578 22.916C6.15866 23.861 8.23546 24.3799 10.3623 24.5859C10.9688 27.2363 12.1672 29.3238 13.958 30.6865C16.1946 32.3885 18.9567 32.6582 21.5752 31.9932C26.6825 30.6959 31.7692 25.8026 34.377 19.0879C34.8111 17.9696 34.2281 16.722 33.0752 16.3008C31.9223 15.8796 30.6355 16.4442 30.2012 17.5625C27.9424 23.3786 23.7617 26.9651 20.4443 27.8076C18.8507 28.2123 17.6111 27.9664 16.7119 27.2822C16.0773 26.7993 15.431 25.9601 14.9756 24.584C16.8021 24.4173 18.6199 24.062 20.2979 23.5381C22.816 22.7519 25.237 21.5166 26.8379 19.7598C28.5423 17.8893 29.2932 15.4095 28.1807 12.7031C27.1893 10.2916 25.3566 8.67628 23.123 8.01074ZM18.5322 12.5547C19.7246 11.9609 20.896 11.8741 21.8135 12.1475C22.6836 12.4068 23.5167 13.0423 24.0361 14.3057C24.4343 15.2743 24.2564 16.058 23.4951 16.8936C22.6302 17.8427 21.0482 18.7568 18.9307 19.418C17.5094 19.8617 15.9434 20.161 14.374 20.291C14.4426 16.0828 16.5086 13.5625 18.5322 12.5547Z" fill="white"/>
<path d="M20 0C27.9498 0 31.9247 0.000162074 34.7959 1.87988C36.1207 2.74731 37.2527 3.87925 38.1201 5.2041C39.9998 8.07531 40 12.0502 40 20C40 27.9498 39.9998 31.9247 38.1201 34.7959C37.2527 36.1207 36.1207 37.2527 34.7959 38.1201C31.9247 39.9998 27.9498 40 20 40C12.0502 40 8.07531 39.9998 5.2041 38.1201C3.87925 37.2527 2.74731 36.1207 1.87988 34.7959C0.000162074 31.9247 0 27.9498 0 20C0 12.0502 0.000162438 8.07531 1.87988 5.2041C2.74731 3.87925 3.87925 2.74731 5.2041 1.87988C8.07531 0.000162438 12.0502 0 20 0ZM23.123 8.01074C20.937 7.35954 18.5663 7.67379 16.4951 8.70508C12.8176 10.5363 10.0301 14.5934 9.91504 20.1689C8.61077 19.9683 7.48322 19.6185 6.6123 19.1436C5.53835 18.5579 4.17802 18.9281 3.57422 19.9697C2.97056 21.0114 3.35188 22.3304 4.42578 22.916C6.15866 23.861 8.23546 24.3799 10.3623 24.5859C10.9688 27.2363 12.1672 29.3238 13.958 30.6865C16.1946 32.3885 18.9567 32.6582 21.5752 31.9932C26.6825 30.6959 31.7692 25.8026 34.377 19.0879C34.8111 17.9696 34.2281 16.722 33.0752 16.3008C31.9223 15.8796 30.6355 16.4442 30.2012 17.5625C27.9424 23.3786 23.7617 26.9651 20.4443 27.8076C18.8507 28.2123 17.6111 27.9664 16.7119 27.2822C16.0773 26.7993 15.431 25.9601 14.9756 24.584C16.8021 24.4173 18.6199 24.062 20.2979 23.5381C22.816 22.7519 25.237 21.5166 26.8379 19.7598C28.5423 17.8893 29.2932 15.4095 28.1807 12.7031C27.1893 10.2916 25.3566 8.67628 23.123 8.01074ZM18.5322 12.5547C19.7246 11.9609 20.896 11.8741 21.8135 12.1475C22.6836 12.4068 23.5167 13.0423 24.0361 14.3057C24.4343 15.2743 24.2564 16.058 23.4951 16.8936C22.6302 17.8427 21.0482 18.7568 18.9307 19.418C17.5094 19.8617 15.9434 20.161 14.374 20.291C14.4426 16.0828 16.5086 13.5625 18.5322 12.5547Z" fill="#F44D21"/>
</svg>


<span className='font-manrope font-bold text-[20px] leading-[100%] tracking-[0] text-black'>Exhibit</span>


        </span>
        <section className="mt-[0px]">
          <ModuleSwitchDrop
            type={selModule}
            id={'Status'}
            setStatusFun={makeFilterFun}
            filteredUnits={filteredUnits}
            pickedValue={selModule}
          />
        </section>
        {/* <GlobalSearchBar /> */}
        <button className="flex items-center justify-center h-10 px-4 ml-auto "></button>
        <button className="flex items-center justify-center h-10 text-sm font-medium "></button>
        <Box
          sx={{
            cursor: 'pointer',
          }}
          display="flex"
          component="span"
          onClick={handleClick}
        >
          <button className="relative ml-2 text-sm focus:outline-none group  items-center justify-center h-10 text-sm font-medium">
            <div className=" w-9 h-9 mr-2  ">
              {/* <svg
                width="30"
                fill="currentColor"
                height="30"
                className="text-gray-800"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
              </svg> */}
              <img src={auth?.currentUser?.photoURL || '/avatar_1.png'} />
            </div>
          </button>
          <Box display="flex" flexDirection="column" mr={2}>
            <Typography variant="body2">{user?.displayName}</Typography>
            <Typography variant="caption" className="text-gray-500">
              {user?.roles?.length > 0
                ? user?.roles[0] == 'admin'
                  ? 'Super User'
                  : user?.roles[0]
                : user?.role?.length > 0
                ? user?.role[0] == 'admin'
                  ? 'Super User'
                  : user?.role[0]
                : user?.department}
            </Typography>
          </Box>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => openUserAccount()}>My Profile</MenuItem>
          <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default HeadNavBar2
