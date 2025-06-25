/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { UserGroupIcon } from '@heroicons/react/outline'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

const SlimSideMenuBar = (props) => {
  const { pgName, sourceLink, showSideView1, setViewable, viewable } = props
  const { user } = useAuth()

  // if (!user?.role?.includes(USER_ROLES.ADMIN)) {
  //   return null
  // }

  return (
    <section className="h-screen">

      <div className="flex flex-col items-center p-1 min-w-[90px] h-[524px] w-[90px] max-w-[90px]   overflow-auto no-scrollbar shadow-[0px_0px_59px_0px_rgba(0,0,0,0.06)]  bg-white  border rounded-[8px] m-2">
        {[
          'hrModule',
          'financeModule',
          'crmModule',
          'projectModule',
          'marketingModule',
          'salesModule',
          'constructModule',
          'legalModule',
        ].includes(sourceLink) && (
            <a>
              {/* <img
                src="https://yt3.googleusercontent.com/f0Ffx-wDWloHZSxH2ksegEkJ-r3gQgDxMxwiyyYyYj7V-TCXwHicF4dcJcwnZ2MDQDQU7zW9=s160-c-k-c0x00ffffff-no-rj"
                className="w-10 h-10 ml-4"
              /> */}
            </a>
          )}
        <section className="mb-4"></section>

        {['crmModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'CrmHome' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('CrmHome')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                          fill={viewable === 'CrmHome' ? 'white' : 'black'}
                        ></path>
                        <path
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          fill={viewable === 'CrmHome' ? 'white' : 'black'}
                        ></path>
                      </svg>
                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'CrmHome' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Home
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'units_inventory' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('units_inventory')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>


                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.49999 8.58309C5.07125 8.58309 5.50436 8.57686 5.87792 8.67684C6.82671 8.93107 7.56781 9.67248 7.82226 10.6212C7.89735 10.9014 7.91312 11.2154 7.91601 11.5958V12.4034C7.91313 12.7839 7.89732 13.0977 7.82226 13.378C7.56797 14.327 6.82692 15.0681 5.87792 15.3223C5.59759 15.3974 5.28382 15.4132 4.90331 15.4161H4.09569C3.71535 15.4132 3.40132 15.3974 3.12108 15.3223C2.17238 15.0679 1.43098 14.3268 1.17675 13.378C1.07677 13.0045 1.083 12.5713 1.083 12.0001C1.083 11.4285 1.07662 10.9949 1.17675 10.6212C1.4311 9.67249 2.1724 8.93119 3.12108 8.67684C3.49476 8.57671 3.92846 8.58309 4.49999 8.58309ZM12.5 8.58309C13.0713 8.58309 13.5044 8.57686 13.8779 8.67684C14.8267 8.93107 15.5678 9.67247 15.8223 10.6212C15.8973 10.9014 15.9131 11.2154 15.916 11.5958V12.4034C15.9131 12.7839 15.8973 13.0977 15.8223 13.378C15.568 14.327 14.8269 15.0681 13.8779 15.3223C13.5976 15.3974 13.2838 15.4132 12.9033 15.4161H12.0957C11.7154 15.4132 11.4013 15.3974 11.1211 15.3223C10.1724 15.0679 9.43098 14.3268 9.17675 13.378C9.07677 13.0045 9.083 12.5713 9.083 12.0001C9.083 11.4285 9.07662 10.9949 9.17675 10.6212C9.4311 9.67249 10.1724 8.93119 11.1211 8.67684C11.4948 8.57671 11.9285 8.58309 12.5 8.58309ZM4.49999 0.58309C5.07125 0.583087 5.50436 0.576861 5.87792 0.67684C6.82671 0.931068 7.56781 1.67248 7.82226 2.62118C7.89735 2.90141 7.91312 3.21544 7.91601 3.59579V4.4034C7.91313 4.78391 7.89732 5.09768 7.82226 5.37801C7.56797 6.32702 6.82692 7.06806 5.87792 7.32235C5.59759 7.39742 5.28382 7.41322 4.90331 7.4161H4.09569C3.71535 7.41321 3.40132 7.39744 3.12108 7.32235C2.17238 7.0679 1.43098 6.3268 1.17675 5.37801C1.07677 5.00445 1.083 4.57135 1.083 4.00008C1.083 3.42855 1.07662 2.99485 1.17675 2.62118C1.4311 1.67249 2.1724 0.931188 3.12108 0.67684C3.49476 0.576713 3.92846 0.583087 4.49999 0.58309ZM12.5 0.58309C13.0713 0.583087 13.5044 0.576861 13.8779 0.67684C14.8267 0.931068 15.5678 1.67248 15.8223 2.62118C15.8973 2.90141 15.9131 3.21544 15.916 3.59579V4.4034C15.9131 4.78391 15.8973 5.09768 15.8223 5.37801C15.568 6.32702 14.8269 7.06806 13.8779 7.32235C13.5976 7.39742 13.2838 7.41322 12.9033 7.4161H12.0957C11.7154 7.41321 11.4013 7.39744 11.1211 7.32235C10.1724 7.0679 9.43098 6.3268 9.17675 5.37801C9.07677 5.00445 9.083 4.57135 9.083 4.00008C9.083 3.42855 9.07662 2.99485 9.17675 2.62118C9.4311 1.67249 10.1724 0.931188 11.1211 0.67684C11.4948 0.576713 11.9285 0.583087 12.5 0.58309Z"
                          fill={viewable === 'units_inventory' ? 'white' : 'black'}
                        />
                      </svg>

                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'units_inventory' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Stalls
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'crmSpace-I' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('crmSpace-I')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>




                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_441_3171)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.58767 2C3.46167 2 3.34933 2.08733 3.306 2.21867L2.53667 4.55567C2.51238 4.62957 2.5 4.70687 2.5 4.78467V5.71433C2.5 6.24 2.88367 6.66667 3.357 6.66667C3.83033 6.66667 4.21433 6.24 4.21433 5.71433C4.21433 6.24033 4.598 6.66667 5.07133 6.66667C5.54467 6.66667 5.92867 6.24 5.92867 5.71433C5.92867 6.24033 6.31233 6.66667 6.78567 6.66667C7.259 6.66667 7.64233 6.24067 7.643 5.715C7.643 6.24067 8.02667 6.66667 8.5 6.66667C8.97333 6.66667 9.357 6.24 9.357 5.71433C9.357 6.24033 9.741 6.66667 10.2143 6.66667C10.6877 6.66667 11.071 6.24067 11.0713 5.715C11.0717 6.24067 11.4553 6.66667 11.9287 6.66667C12.402 6.66667 12.7857 6.24 12.7857 5.71433C12.7857 6.24033 13.1693 6.66667 13.643 6.66667C14.1163 6.66667 14.5 6.24 14.5 5.71433V4.78467C14.5 4.70687 14.4876 4.62957 14.4633 4.55567L13.694 2.219C13.6507 2.08733 13.5383 2 13.4123 2H3.58767Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.83334 7.07683V9.66683H3.00001C2.95581 9.66683 2.91342 9.68439 2.88216 9.71564C2.8509 9.7469 2.83334 9.78929 2.83334 9.8335V10.1668C2.83334 10.211 2.8509 10.2534 2.88216 10.2847C2.91342 10.3159 2.95581 10.3335 3.00001 10.3335H14C14.0442 10.3335 14.0866 10.3159 14.1179 10.2847C14.1491 10.2534 14.1667 10.211 14.1667 10.1668V9.8335C14.1667 9.78929 14.1491 9.7469 14.1179 9.71564C14.0866 9.68439 14.0442 9.66683 14 9.66683H13.1667V7.07683C13.0271 7.02132 12.8982 6.94203 12.7857 6.8425C12.6991 6.91857 12.6031 6.98311 12.5 7.0345V9.66683H4.50001V7.0345C4.39689 6.98311 4.30087 6.91857 4.21434 6.8425C4.10234 6.94083 3.97434 7.02083 3.83334 7.07683ZM12.5 6.4245C12.5282 6.39627 12.5549 6.36594 12.58 6.3335H12.5V6.4245ZM12.9913 6.3335C13.0419 6.39866 13.1008 6.45683 13.1667 6.5065V6.3335H12.9913ZM3.83334 6.5065C3.89973 6.45747 3.95877 6.39922 4.00868 6.3335H3.83334V6.5065ZM4.42001 6.3335H4.50001V6.4245C4.47153 6.39581 4.44481 6.36542 4.42001 6.3335ZM3.33334 11.0002C3.28914 11.0002 3.24675 11.0177 3.21549 11.049C3.18424 11.0802 3.16668 11.1226 3.16668 11.1668V13.6668C3.16668 13.7552 3.2018 13.84 3.26431 13.9025C3.32682 13.965 3.4116 14.0002 3.50001 14.0002H13.5C13.5884 14.0002 13.6732 13.965 13.7357 13.9025C13.7982 13.84 13.8333 13.7552 13.8333 13.6668V11.1668C13.8333 11.1226 13.8158 11.0802 13.7845 11.049C13.7533 11.0177 13.7109 11.0002 13.6667 11.0002H3.33334Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                          <path d="M5.16666 8.83317C5.16666 8.78897 5.18422 8.74658 5.21547 8.71532C5.24673 8.68406 5.28912 8.6665 5.33332 8.6665H6.33332C6.37753 8.6665 6.41992 8.68406 6.45117 8.71532C6.48243 8.74658 6.49999 8.78897 6.49999 8.83317V9.49984C6.49999 9.54404 6.48243 9.58643 6.45117 9.61769C6.41992 9.64894 6.37753 9.6665 6.33332 9.6665H5.33332C5.28912 9.6665 5.24673 9.64894 5.21547 9.61769C5.18422 9.58643 5.16666 9.54404 5.16666 9.49984V8.83317Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                          <path d="M5.83334 9.1665C5.83334 9.1223 5.8509 9.07991 5.88216 9.04865C5.91341 9.0174 5.95581 8.99984 6.00001 8.99984H7.00001C7.04421 8.99984 7.08661 9.0174 7.11786 9.04865C7.14912 9.07991 7.16668 9.1223 7.16668 9.1665V9.49984C7.16668 9.54404 7.14912 9.58643 7.11786 9.61769C7.08661 9.64894 7.04421 9.6665 7.00001 9.6665H6.00001C5.95581 9.6665 5.91341 9.64894 5.88216 9.61769C5.8509 9.58643 5.83334 9.54404 5.83334 9.49984V9.1665ZM8.50001 9.1665C8.50001 9.29911 8.44733 9.42629 8.35356 9.52006C8.2598 9.61383 8.13262 9.6665 8.00001 9.6665C7.8674 9.6665 7.74023 9.61383 7.64646 9.52006C7.55269 9.42629 7.50001 9.29911 7.50001 9.1665C7.50001 9.0339 7.55269 8.90672 7.64646 8.81295C7.74023 8.71918 7.8674 8.6665 8.00001 8.6665C8.13262 8.6665 8.2598 8.71918 8.35356 8.81295C8.44733 8.90672 8.50001 9.0339 8.50001 9.1665Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                          <g clip-path="url(#clip1_441_3171)">
                            <path d="M7.5 11.5C7.5 9.01472 9.51472 7 12 7C14.4853 7 16.5 9.01472 16.5 11.5C16.5 13.9853 14.4853 16 12 16C9.51472 16 7.5 13.9853 7.5 11.5Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                            <path d="M15.5156 11.9221C15.2344 13.3283 14.1741 14.6525 12.6863 14.9483C11.9606 15.0928 11.2079 15.0047 10.5353 14.6966C9.86261 14.3884 9.30435 13.8758 8.93994 13.2319C8.57554 12.588 8.42358 11.8455 8.5057 11.1102C8.58782 10.3749 8.89984 9.68425 9.39732 9.13658C10.4177 8.01271 12.1406 7.70333 13.5469 8.26583" stroke="#4D4D4D" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.7344 11.3594L12.1406 12.7656L15.5156 9.10938" stroke="#4D4D4D" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_441_3171">
                            <rect width="16" height="16" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} transform="translate(0.5)" />
                          </clipPath>
                          <clipPath id="clip1_441_3171">
                            <path d="M7.5 11.5C7.5 9.01472 9.51472 7 12 7C14.4853 7 16.5 9.01472 16.5 11.5C16.5 13.9853 14.4853 16 12 16C9.51472 16 7.5 13.9853 7.5 11.5Z" fill={viewable === 'crmSpace-I' ? 'white' : 'black'} />
                          </clipPath>
                        </defs>
                      </svg>








                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'crmSpace-I' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Bookings
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'stallEnquiries' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('stallEnquiries')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>




                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.49999 1.6001C7.6513 1.6001 6.83737 1.93724 6.23725 2.53736C5.63714 3.13747 5.29999 3.9514 5.29999 4.8001C5.29999 5.64879 5.63714 6.46272 6.23725 7.06284C6.83737 7.66296 7.6513 8.0001 8.49999 8.0001C9.34869 8.0001 10.1626 7.66296 10.7627 7.06284C11.3629 6.46272 11.7 5.64879 11.7 4.8001C11.7 3.9514 11.3629 3.13747 10.7627 2.53736C10.1626 1.93724 9.34869 1.6001 8.49999 1.6001ZM4.50719 8.8001C4.29647 8.79915 4.08764 8.83983 3.89269 8.91982C3.69774 8.9998 3.5205 9.11751 3.37117 9.26617C3.22183 9.41484 3.10333 9.59154 3.02247 9.78614C2.94161 9.98073 2.89999 10.1894 2.89999 10.4001C2.89999 11.7529 3.56639 12.7729 4.60799 13.4377C5.47039 13.9873 6.58559 14.2937 7.79999 14.3769L8.09199 13.4185C7.83323 12.8472 7.69958 12.2272 7.69999 11.6001C7.69999 10.5361 8.07759 9.5601 8.70559 8.8001H4.50719ZM15.7 11.6001C15.7001 12.2267 15.5367 12.8425 15.2258 13.3866C14.915 13.9307 14.4675 14.3842 13.9277 14.7023C13.3878 15.0204 12.7743 15.1922 12.1477 15.2005C11.5212 15.2088 10.9033 15.0534 10.3552 14.7497L8.92319 15.1849C8.86653 15.2018 8.80637 15.203 8.74905 15.1885C8.69174 15.174 8.63941 15.1443 8.59761 15.1025C8.5558 15.0607 8.52607 15.0084 8.51157 14.951C8.49706 14.8937 8.49831 14.8336 8.51519 14.7769L8.95039 13.3457C8.68432 12.8651 8.53178 12.3299 8.50445 11.7812C8.47712 11.2325 8.57574 10.6848 8.79274 10.1801C9.00974 9.67544 9.33937 9.2271 9.75639 8.86946C10.1734 8.51182 10.6667 8.25436 11.1986 8.11681C11.7305 7.97925 12.2868 7.96525 12.8249 8.07587C13.363 8.1865 13.8687 8.41881 14.3032 8.75502C14.7376 9.09123 15.0894 9.52242 15.3315 10.0156C15.5736 10.5087 15.6997 11.0507 15.7 11.6001ZM10.5 10.4001C10.3939 10.4001 10.2922 10.4422 10.2172 10.5173C10.1421 10.5923 10.1 10.694 10.1 10.8001C10.1 10.9062 10.1421 11.0079 10.2172 11.0829C10.2922 11.158 10.3939 11.2001 10.5 11.2001H13.7C13.8061 11.2001 13.9078 11.158 13.9828 11.0829C14.0579 11.0079 14.1 10.9062 14.1 10.8001C14.1 10.694 14.0579 10.5923 13.9828 10.5173C13.9078 10.4422 13.8061 10.4001 13.7 10.4001H10.5ZM10.1 12.4001C10.1 12.5062 10.1421 12.6079 10.2172 12.6829C10.2922 12.758 10.3939 12.8001 10.5 12.8001H12.1C12.2061 12.8001 12.3078 12.758 12.3828 12.6829C12.4579 12.6079 12.5 12.5062 12.5 12.4001C12.5 12.294 12.4579 12.1923 12.3828 12.1173C12.3078 12.0422 12.2061 12.0001 12.1 12.0001H10.5C10.3939 12.0001 10.2922 12.0422 10.2172 12.1173C10.1421 12.1923 10.1 12.294 10.1 12.4001Z" fill={viewable === 'stallEnquiries' ? 'white' : 'black'} />
                      </svg>





                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'stallEnquiries' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Enquiry
                    </span>
                  </span>
                </span>
              </li>

              {(user?.role?.includes(USER_ROLES.SALES_MANAGER) ||
                user?.role?.includes(USER_ROLES.ADMIN)) && (
                  <li className="relative mt-1 pt-1">
                    <span
                      className={
                        'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                        (viewable === 'leadslake' ? 'bg-[#F44D21] w-100' : '')
                      }
                      onClick={() => setViewable('leadslake')}
                      style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <span className="flex items-center flex-col">
                        <span>



                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50001 1.6001C7.65132 1.6001 6.83739 1.93724 6.23727 2.53736C5.63715 3.13747 5.30001 3.9514 5.30001 4.8001C5.30001 5.64879 5.63715 6.46272 6.23727 7.06284C6.83739 7.66296 7.65132 8.0001 8.50001 8.0001C9.3487 8.0001 10.1626 7.66296 10.7628 7.06284C11.3629 6.46272 11.7 5.64879 11.7 4.8001C11.7 3.9514 11.3629 3.13747 10.7628 2.53736C10.1626 1.93724 9.3487 1.6001 8.50001 1.6001ZM12.392 13.4377C11.5352 13.9841 10.4288 14.2889 9.22241 14.3745C9.16219 14.2157 9.06894 14.0714 8.94881 13.9513L7.34881 12.3521C7.58018 11.8674 7.70017 11.3372 7.70001 10.8001C7.70009 10.0881 7.48906 9.39213 7.09361 8.8001H12.5C12.9244 8.8001 13.3313 8.96867 13.6314 9.26873C13.9314 9.56879 14.1 9.97575 14.1 10.4001C14.1 11.7529 13.4336 12.7729 12.392 13.4377ZM4.10001 13.6001C4.72881 13.6001 5.30961 13.3921 5.77681 13.0425L7.81681 15.0825C7.85395 15.1197 7.89805 15.1492 7.94659 15.1693C7.99513 15.1895 8.04717 15.1999 8.09973 15.1999C8.15229 15.2 8.20434 15.1896 8.25291 15.1696C8.30148 15.1495 8.34562 15.12 8.38281 15.0829C8.42 15.0458 8.44951 15.0017 8.46966 14.9531C8.48981 14.9046 8.5002 14.8525 8.50023 14.8C8.50027 14.7474 8.48996 14.6954 8.46988 14.6468C8.4498 14.5982 8.42035 14.5541 8.38321 14.5169L6.34321 12.4769C6.72082 11.9719 6.91693 11.3543 6.89978 10.724C6.88263 10.0936 6.65323 9.48756 6.24873 9.00386C5.84422 8.52016 5.28829 8.18715 4.67095 8.05876C4.05361 7.93037 3.41101 8.0141 2.84719 8.29642C2.28337 8.57873 1.83134 9.04308 1.56431 9.6143C1.29727 10.1855 1.23085 10.8301 1.37581 11.4438C1.52077 12.0575 1.86861 12.6042 2.36302 12.9956C2.85743 13.3869 3.46946 13.5999 4.10001 13.6001ZM4.10001 12.8001C3.56958 12.8001 3.06087 12.5894 2.6858 12.2143C2.31072 11.8392 2.10001 11.3305 2.10001 10.8001C2.10001 10.2697 2.31072 9.76096 2.6858 9.38588C3.06087 9.01081 3.56958 8.8001 4.10001 8.8001C4.63044 8.8001 5.13915 9.01081 5.51422 9.38588C5.8893 9.76096 6.10001 10.2697 6.10001 10.8001C6.10001 11.3305 5.8893 11.8392 5.51422 12.2143C5.13915 12.5894 4.63044 12.8001 4.10001 12.8001Z" fill={viewable === 'leadslake' ? 'white' : 'black'} />
                          </svg>
                        </span>
                        <span
                          className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'leadslake' ? 'text-[#FAFAFA]' : 'text-black'
                            }`}
                        >
                          Online <br /> Enquiry
                        </span>
                      </span>
                    </span>
                  </li>
                )}

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'leadsController' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('leadsController')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          fill={viewable === 'leadsController' ? 'white' : 'black'}
                        />
                      </svg>
                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'leadsController' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Leads Transfer
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('MyCustomers-II')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>
                      <UserGroupIcon className="h-4 w-4" fill={viewable === 'Today1' ? 'white' : 'black'} />
                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'Today1' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Exhibitors
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'crmAnalytics' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('crmAnalytics')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                          fill={viewable === 'crmAnalytics' ? 'white' : 'black'}
                        />
                      </svg>
                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'crmAnalytics' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Reports
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'eventsDisplay' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('eventsDisplay')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill={viewable === 'eventsDisplay' ? 'white' : 'black'}
                        ></path>
                      </svg>
                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'eventsDisplay' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Events box1
                    </span>
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}

        {['constructModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Today1')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Tasks</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'ConstructUnits'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('ConstructUnits')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Stalls box1</span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'ConstructQueries'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('ConstructQueries')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Modify</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Roles Management'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Roles Management')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Gallery</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'projectReports'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('projectReports')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Reports</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}

        {['projectModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2  py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded   hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'ongoing_projects'
                      ? 'bg-[#F44D21] w-100  '
                      : '')
                  }
                  onClick={() => setViewable('ongoing_projects')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col ">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8.58309C4.57126 8.58309 5.00437 8.57686 5.37793 8.67684C6.32672 8.93107 7.06782 9.67248 7.32226 10.6212C7.39735 10.9014 7.41313 11.2154 7.41601 11.5958V12.4034C7.41314 12.7839 7.39733 13.0977 7.32226 13.378C7.06798 14.327 6.32693 15.0681 5.37793 15.3223C5.0976 15.3974 4.78383 15.4132 4.40332 15.4161H3.5957C3.21536 15.4132 2.90133 15.3974 2.62109 15.3223C1.67239 15.0679 0.930984 14.3268 0.676756 13.378C0.576777 13.0045 0.583003 12.5713 0.583006 12.0001C0.583003 11.4285 0.576629 10.9949 0.676756 10.6212C0.931104 9.67249 1.6724 8.93119 2.62109 8.67684C2.99477 8.57671 3.42847 8.58309 4 8.58309ZM12 8.58309C12.5713 8.58309 13.0044 8.57686 13.3779 8.67684C14.3267 8.93107 15.0678 9.67247 15.3223 10.6212C15.3974 10.9014 15.4131 11.2154 15.416 11.5958V12.4034C15.4131 12.7839 15.3973 13.0977 15.3223 13.378C15.068 14.327 14.3269 15.0681 13.3779 15.3223C13.0976 15.3974 12.7838 15.4132 12.4033 15.4161H11.5957C11.2154 15.4132 10.9013 15.3974 10.6211 15.3223C9.67239 15.0679 8.93098 14.3268 8.67676 13.378C8.57678 13.0045 8.583 12.5713 8.58301 12.0001C8.583 11.4285 8.57663 10.9949 8.67676 10.6212C8.9311 9.67249 9.6724 8.93119 10.6211 8.67684C10.9948 8.57671 11.4285 8.58309 12 8.58309ZM4 0.58309C4.57126 0.583087 5.00437 0.576861 5.37793 0.67684C6.32672 0.931068 7.06782 1.67248 7.32226 2.62118C7.39735 2.90141 7.41313 3.21544 7.41601 3.59579V4.4034C7.41314 4.78391 7.39733 5.09768 7.32226 5.37801C7.06798 6.32702 6.32693 7.06806 5.37793 7.32235C5.0976 7.39742 4.78383 7.41322 4.40332 7.4161H3.5957C3.21536 7.41321 2.90133 7.39744 2.62109 7.32235C1.67239 7.0679 0.930984 6.3268 0.676756 5.37801C0.576777 5.00445 0.583003 4.57135 0.583006 4.00008C0.583003 3.42855 0.576629 2.99485 0.676756 2.62118C0.931104 1.67249 1.6724 0.931188 2.62109 0.67684C2.99477 0.576713 3.42847 0.583087 4 0.58309ZM12 0.58309C12.5713 0.583087 13.0044 0.576861 13.3779 0.67684C14.3267 0.931068 15.0678 1.67248 15.3223 2.62118C15.3974 2.90141 15.4131 3.21544 15.416 3.59579V4.4034C15.4131 4.78391 15.3973 5.09768 15.3223 5.37801C15.068 6.32702 14.3269 7.06806 13.3779 7.32235C13.0976 7.39742 12.7838 7.41322 12.4033 7.4161H11.5957C11.2154 7.41321 10.9013 7.39744 10.6211 7.32235C9.67239 7.0679 8.93098 6.3268 8.67676 5.37801C8.57678 5.00445 8.583 4.57135 8.58301 4.00008C8.583 3.42855 8.57663 2.99485 8.67676 2.62118C8.9311 1.67249 9.6724 0.931188 10.6211 0.67684C10.9948 0.576713 11.4285 0.583087 12 0.58309Z"
                          fill={viewable === 'ongoing_projects' ? 'white' : 'black'}
                        />
                      </svg>


                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'ongoing_projects' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Events
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Integrations' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('Integrations')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>

                      <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.08767 0C0.961667 0 0.849333 0.0873334 0.806 0.218667L0.0366667 2.55567C0.0123752 2.62957 -1.7756e-06 2.70687 1.91059e-10 2.78467V3.71433C1.91059e-10 4.24 0.383667 4.66667 0.857 4.66667C1.33033 4.66667 1.71433 4.24 1.71433 3.71433C1.71433 4.24033 2.098 4.66667 2.57133 4.66667C3.04467 4.66667 3.42867 4.24 3.42867 3.71433C3.42867 4.24033 3.81233 4.66667 4.28567 4.66667C4.759 4.66667 5.14233 4.24067 5.143 3.715C5.143 4.24067 5.52667 4.66667 6 4.66667C6.47333 4.66667 6.857 4.24 6.857 3.71433C6.857 4.24033 7.241 4.66667 7.71433 4.66667C8.18767 4.66667 8.571 4.24067 8.57133 3.715C8.57167 4.24067 8.95533 4.66667 9.42867 4.66667C9.902 4.66667 10.2857 4.24 10.2857 3.71433C10.2857 4.24033 10.6693 4.66667 11.143 4.66667C11.6163 4.66667 12 4.24 12 3.71433V2.78467C12 2.70687 11.9876 2.62957 11.9633 2.55567L11.194 0.219C11.1507 0.0873333 11.0383 0 10.9123 0H1.08767Z" fill={viewable === 'Integrations' ? 'white' : 'black'} />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.33333 5.07659V7.66658H0.499999C0.455796 7.66658 0.413404 7.68414 0.382148 7.7154C0.350892 7.74666 0.333332 7.78905 0.333332 7.83325V8.16658C0.333332 8.21079 0.350892 8.25318 0.382148 8.28444C0.413404 8.31569 0.455796 8.33325 0.499999 8.33325H11.5C11.5442 8.33325 11.5866 8.31569 11.6178 8.28444C11.6491 8.25318 11.6667 8.21079 11.6667 8.16658V7.83325C11.6667 7.78905 11.6491 7.74666 11.6178 7.7154C11.5866 7.68414 11.5442 7.66658 11.5 7.66658H10.6667V5.07659C10.5271 5.02107 10.3982 4.94179 10.2857 4.84225C10.1991 4.91833 10.1031 4.98286 10 5.03425V7.66658H2V5.03425C1.89688 4.98286 1.80086 4.91833 1.71433 4.84225C1.60233 4.94059 1.47433 5.02059 1.33333 5.07659ZM10 4.42425C10.0282 4.39603 10.0549 4.3657 10.08 4.33325H10V4.42425ZM10.4913 4.33325C10.5419 4.39841 10.6008 4.45658 10.6667 4.50625V4.33325H10.4913ZM1.33333 4.50625C1.39971 4.45723 1.45876 4.39897 1.50867 4.33325H1.33333V4.50625ZM1.92 4.33325H2V4.42425C1.97152 4.39556 1.9448 4.36517 1.92 4.33325ZM0.833332 8.99992C0.789129 8.99992 0.746737 9.01748 0.715481 9.04873C0.684225 9.07999 0.666665 9.12238 0.666665 9.16658V11.6666C0.666665 11.755 0.701784 11.8398 0.764297 11.9023C0.826809 11.9648 0.911593 11.9999 0.999999 11.9999H11C11.0884 11.9999 11.1732 11.9648 11.2357 11.9023C11.2982 11.8398 11.3333 11.755 11.3333 11.6666V9.16658C11.3333 9.12238 11.3158 9.07999 11.2845 9.04873C11.2533 9.01748 11.2109 8.99992 11.1667 8.99992H0.833332Z" fill={viewable === 'Integrations' ? 'white' : 'black'} />
                        <path d="M2.66667 6.83341C2.66667 6.78921 2.68423 6.74682 2.71548 6.71556C2.74674 6.68431 2.78913 6.66675 2.83333 6.66675H3.83333C3.87754 6.66675 3.91993 6.68431 3.95119 6.71556C3.98244 6.74682 4 6.78921 4 6.83341V7.50008C4 7.54428 3.98244 7.58668 3.95119 7.61793C3.91993 7.64919 3.87754 7.66675 3.83333 7.66675H2.83333C2.78913 7.66675 2.74674 7.64919 2.71548 7.61793C2.68423 7.58668 2.66667 7.54428 2.66667 7.50008V6.83341Z" fill={viewable === 'Integrations' ? 'white' : 'black'} />
                        <path d="M3.33333 7.16675C3.33333 7.12255 3.35089 7.08015 3.38215 7.0489C3.4134 7.01764 3.4558 7.00008 3.5 7.00008H4.5C4.5442 7.00008 4.58659 7.01764 4.61785 7.0489C4.64911 7.08015 4.66667 7.12255 4.66667 7.16675V7.50008C4.66667 7.54428 4.64911 7.58668 4.61785 7.61793C4.58659 7.64919 4.5442 7.66675 4.5 7.66675H3.5C3.4558 7.66675 3.4134 7.64919 3.38215 7.61793C3.35089 7.58668 3.33333 7.54428 3.33333 7.50008V7.16675ZM6 7.16675C6 7.29936 5.94732 7.42653 5.85355 7.5203C5.75978 7.61407 5.63261 7.66675 5.5 7.66675C5.36739 7.66675 5.24021 7.61407 5.14645 7.5203C5.05268 7.42653 5 7.29936 5 7.16675C5 7.03414 5.05268 6.90696 5.14645 6.81319C5.24021 6.71943 5.36739 6.66675 5.5 6.66675C5.63261 6.66675 5.75978 6.71943 5.85355 6.81319C5.94732 6.90696 6 7.03414 6 7.16675Z" fill={viewable === 'Integrations' ? 'white' : 'black'} />
                      </svg>




                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'Integrations' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Connect
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Setup' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('Setup')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>

                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.08767 2C2.96167 2 2.84933 2.08733 2.806 2.21867L2.03667 4.55567C2.01238 4.62957 2 4.70687 2 4.78467V5.71433C2 6.24 2.38367 6.66667 2.857 6.66667C3.33033 6.66667 3.71433 6.24 3.71433 5.71433C3.71433 6.24033 4.098 6.66667 4.57133 6.66667C5.04467 6.66667 5.42867 6.24 5.42867 5.71433C5.42867 6.24033 5.81233 6.66667 6.28567 6.66667C6.759 6.66667 7.14233 6.24067 7.143 5.715C7.143 6.24067 7.52667 6.66667 8 6.66667C8.47333 6.66667 8.857 6.24 8.857 5.71433C8.857 6.24033 9.241 6.66667 9.71433 6.66667C10.1877 6.66667 10.571 6.24067 10.5713 5.715C10.5717 6.24067 10.9553 6.66667 11.4287 6.66667C11.902 6.66667 12.2857 6.24 12.2857 5.71433C12.2857 6.24033 12.6693 6.66667 13.143 6.66667C13.6163 6.66667 14 6.24 14 5.71433V4.78467C14 4.70687 13.9876 4.62957 13.9633 4.55567L13.194 2.219C13.1507 2.08733 13.0383 2 12.9123 2H3.08767Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 7.07659V9.66658H2.5C2.4558 9.66658 2.4134 9.68414 2.38215 9.7154C2.35089 9.74666 2.33333 9.78905 2.33333 9.83325V10.1666C2.33333 10.2108 2.35089 10.2532 2.38215 10.2844C2.4134 10.3157 2.4558 10.3333 2.5 10.3333H13.5C13.5442 10.3333 13.5866 10.3157 13.6178 10.2844C13.6491 10.2532 13.6667 10.2108 13.6667 10.1666V9.83325C13.6667 9.78905 13.6491 9.74666 13.6178 9.7154C13.5866 9.68414 13.5442 9.66658 13.5 9.66658H12.6667V7.07659C12.5271 7.02107 12.3982 6.94179 12.2857 6.84225C12.1991 6.91833 12.1031 6.98286 12 7.03425V9.66658H4V7.03425C3.89688 6.98286 3.80086 6.91833 3.71433 6.84225C3.60233 6.94059 3.47433 7.02059 3.33333 7.07659ZM12 6.42425C12.0282 6.39603 12.0549 6.3657 12.08 6.33325H12V6.42425ZM12.4913 6.33325C12.5419 6.39841 12.6008 6.45658 12.6667 6.50625V6.33325H12.4913ZM3.33333 6.50625C3.39971 6.45723 3.45876 6.39897 3.50867 6.33325H3.33333V6.50625ZM3.92 6.33325H4V6.42425C3.97152 6.39556 3.9448 6.36517 3.92 6.33325ZM2.83333 10.9999C2.78913 10.9999 2.74674 11.0175 2.71548 11.0487C2.68422 11.08 2.66667 11.1224 2.66667 11.1666V13.6666C2.66667 13.755 2.70178 13.8398 2.7643 13.9023C2.82681 13.9648 2.91159 13.9999 3 13.9999H13C13.0884 13.9999 13.1732 13.9648 13.2357 13.9023C13.2982 13.8398 13.3333 13.755 13.3333 13.6666V11.1666C13.3333 11.1224 13.3158 11.08 13.2845 11.0487C13.2533 11.0175 13.2109 10.9999 13.1667 10.9999H2.83333Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                        <path d="M4.66667 8.83341C4.66667 8.78921 4.68423 8.74682 4.71548 8.71556C4.74674 8.68431 4.78913 8.66675 4.83333 8.66675H5.83333C5.87754 8.66675 5.91993 8.68431 5.95119 8.71556C5.98244 8.74682 6 8.78921 6 8.83341V9.50008C6 9.54428 5.98244 9.58668 5.95119 9.61793C5.91993 9.64919 5.87754 9.66675 5.83333 9.66675H4.83333C4.78913 9.66675 4.74674 9.64919 4.71548 9.61793C4.68423 9.58668 4.66667 9.54428 4.66667 9.50008V8.83341Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                        <path d="M5.33333 9.16675C5.33333 9.12255 5.35089 9.08015 5.38215 9.0489C5.4134 9.01764 5.4558 9.00008 5.5 9.00008H6.5C6.5442 9.00008 6.58659 9.01764 6.61785 9.0489C6.64911 9.08015 6.66667 9.12255 6.66667 9.16675V9.50008C6.66667 9.54428 6.64911 9.58668 6.61785 9.61793C6.58659 9.64919 6.5442 9.66675 6.5 9.66675H5.5C5.4558 9.66675 5.4134 9.64919 5.38215 9.61793C5.35089 9.58668 5.33333 9.54428 5.33333 9.50008V9.16675ZM8 9.16675C8 9.29936 7.94732 9.42653 7.85355 9.5203C7.75978 9.61407 7.63261 9.66675 7.5 9.66675C7.36739 9.66675 7.24021 9.61407 7.14645 9.5203C7.05268 9.42653 7 9.29936 7 9.16675C7 9.03414 7.05268 8.90696 7.14645 8.81319C7.24021 8.71943 7.36739 8.66675 7.5 8.66675C7.63261 8.66675 7.75978 8.71943 7.85355 8.81319C7.94732 8.90696 8 9.03414 8 9.16675Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                        <g clip-path="url(#clip0_441_3688)">
                          <path d="M7 11.5C7 9.01472 9.01472 7 11.5 7C13.9853 7 16 9.01472 16 11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                          <path d="M15.0156 11.9218C14.7344 13.3281 13.6741 14.6522 12.1862 14.9481C11.4606 15.0926 10.7079 15.0045 10.0352 14.6963C9.36261 14.3881 8.80434 13.8756 8.43994 13.2317C8.07554 12.5878 7.92358 11.8453 8.0057 11.11C8.08782 10.3747 8.39983 9.684 8.89731 9.13634C9.91768 8.01246 11.6406 7.70309 13.0469 8.26559" stroke="#4D4D4D" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M10.2344 11.3594L11.6406 12.7656L15.0156 9.10938" stroke="#4D4D4D" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_441_3688">
                            <path d="M7 11.5C7 9.01472 9.01472 7 11.5 7C13.9853 7 16 9.01472 16 11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5Z" fill={viewable === 'ongoing_projects' ? 'white' : 'black'} />
                          </clipPath>
                        </defs>
                      </svg>


                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'Setup' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Masters
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Marketing' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('Marketing')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>

                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.6001C7.15131 1.6001 6.33738 1.93724 5.73726 2.53736C5.13714 3.13747 4.8 3.9514 4.8 4.8001C4.8 5.64879 5.13714 6.46272 5.73726 7.06284C6.33738 7.66296 7.15131 8.0001 8 8.0001C8.84869 8.0001 9.66263 7.66296 10.2627 7.06284C10.8629 6.46272 11.2 5.64879 11.2 4.8001C11.2 3.9514 10.8629 3.13747 10.2627 2.53736C9.66263 1.93724 8.84869 1.6001 8 1.6001ZM4.0072 8.8001C3.79648 8.79915 3.58765 8.83983 3.3927 8.91982C3.19774 8.9998 3.02051 9.11751 2.87117 9.26617C2.72184 9.41484 2.60334 9.59154 2.52248 9.78614C2.44162 9.98073 2.4 10.1894 2.4 10.4001C2.4 11.7529 3.0664 12.7729 4.108 13.4377C4.9704 13.9873 6.0856 14.2937 7.3 14.3769L7.592 13.4185C7.33324 12.8472 7.19958 12.2272 7.2 11.6001C7.2 10.5361 7.5776 9.5601 8.2056 8.8001H4.0072ZM15.2 11.6001C15.2001 12.2267 15.0367 12.8425 14.7258 13.3866C14.415 13.9307 13.9675 14.3842 13.4277 14.7023C12.8878 15.0204 12.2743 15.1922 11.6477 15.2005C11.0212 15.2088 10.4033 15.0534 9.8552 14.7497L8.4232 15.1849C8.36654 15.2018 8.30637 15.203 8.24906 15.1885C8.19175 15.174 8.13942 15.1443 8.09762 15.1025C8.05581 15.0607 8.02608 15.0084 8.01157 14.951C7.99707 14.8937 7.99832 14.8336 8.0152 14.7769L8.4504 13.3457C8.18433 12.8651 8.03179 12.3299 8.00446 11.7812C7.97713 11.2325 8.07574 10.6848 8.29275 10.1801C8.50975 9.67544 8.83938 9.2271 9.25639 8.86946C9.67341 8.51182 10.1667 8.25436 10.6986 8.11681C11.2305 7.97925 11.7868 7.96525 12.3249 8.07587C12.863 8.1865 13.3687 8.41881 13.8032 8.75502C14.2377 9.09123 14.5894 9.52242 14.8315 10.0156C15.0737 10.5087 15.1997 11.0507 15.2 11.6001ZM10 10.4001C9.89392 10.4001 9.79217 10.4422 9.71716 10.5173C9.64214 10.5923 9.6 10.694 9.6 10.8001C9.6 10.9062 9.64214 11.0079 9.71716 11.0829C9.79217 11.158 9.89392 11.2001 10 11.2001H13.2C13.3061 11.2001 13.4078 11.158 13.4828 11.0829C13.5579 11.0079 13.6 10.9062 13.6 10.8001C13.6 10.694 13.5579 10.5923 13.4828 10.5173C13.4078 10.4422 13.3061 10.4001 13.2 10.4001H10ZM9.6 12.4001C9.6 12.5062 9.64214 12.6079 9.71716 12.6829C9.79217 12.758 9.89392 12.8001 10 12.8001H11.6C11.7061 12.8001 11.8078 12.758 11.8828 12.6829C11.9579 12.6079 12 12.5062 12 12.4001C12 12.294 11.9579 12.1923 11.8828 12.1173C11.8078 12.0422 11.7061 12.0001 11.6 12.0001H10C9.89392 12.0001 9.79217 12.0422 9.71716 12.1173C9.64214 12.1923 9.6 12.294 9.6 12.4001Z" fill="#4D4D4D" />
                      </svg>


                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'Marketing' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Templates
                    </span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Bank Accounts' ? 'bg-[#F44D21] w-100' : '')
                  }
                  onClick={() => setViewable('Bank Accounts')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col">
                    <span>

                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.6001C7.15131 1.6001 6.33737 1.93724 5.73726 2.53736C5.13714 3.13747 4.8 3.9514 4.8 4.8001C4.8 5.64879 5.13714 6.46272 5.73726 7.06284C6.33737 7.66296 7.15131 8.0001 8 8.0001C8.84869 8.0001 9.66263 7.66296 10.2627 7.06284C10.8629 6.46272 11.2 5.64879 11.2 4.8001C11.2 3.9514 10.8629 3.13747 10.2627 2.53736C9.66263 1.93724 8.84869 1.6001 8 1.6001ZM11.892 13.4377C11.0352 13.9841 9.9288 14.2889 8.7224 14.3745C8.66218 14.2157 8.56893 14.0714 8.4488 13.9513L6.8488 12.3521C7.08017 11.8674 7.20016 11.3372 7.2 10.8001C7.20008 10.0881 6.98905 9.39213 6.5936 8.8001H12C12.4243 8.8001 12.8313 8.96867 13.1314 9.26873C13.4314 9.56879 13.6 9.97575 13.6 10.4001C13.6 11.7529 12.9336 12.7729 11.892 13.4377ZM3.6 13.6001C4.2288 13.6001 4.8096 13.3921 5.2768 13.0425L7.3168 15.0825C7.35394 15.1197 7.39804 15.1492 7.44658 15.1693C7.49512 15.1895 7.54716 15.1999 7.59972 15.1999C7.65227 15.2 7.70433 15.1896 7.7529 15.1696C7.80147 15.1495 7.84561 15.12 7.8828 15.0829C7.91999 15.0458 7.9495 15.0017 7.96965 14.9531C7.9898 14.9046 8.00019 14.8525 8.00022 14.8C8.00026 14.7474 7.98994 14.6954 7.96987 14.6468C7.94979 14.5982 7.92034 14.5541 7.8832 14.5169L5.8432 12.4769C6.22081 11.9719 6.41692 11.3543 6.39977 10.724C6.38262 10.0936 6.15322 9.48756 5.74871 9.00386C5.34421 8.52016 4.78828 8.18715 4.17094 8.05876C3.5536 7.93037 2.911 8.0141 2.34718 8.29642C1.78336 8.57873 1.33133 9.04308 1.06429 9.6143C0.797257 10.1855 0.730839 10.8301 0.875797 11.4438C1.02075 12.0575 1.3686 12.6042 1.86301 12.9956C2.35742 13.3869 2.96945 13.5999 3.6 13.6001ZM3.6 12.8001C3.06957 12.8001 2.56086 12.5894 2.18579 12.2143C1.81071 11.8392 1.6 11.3305 1.6 10.8001C1.6 10.2697 1.81071 9.76096 2.18579 9.38588C2.56086 9.01081 3.06957 8.8001 3.6 8.8001C4.13043 8.8001 4.63914 9.01081 5.01421 9.38588C5.38929 9.76096 5.6 10.2697 5.6 10.8001C5.6 11.3305 5.38929 11.8392 5.01421 12.2143C4.63914 12.5894 4.13043 12.8001 3.6 12.8001Z" fill="#4D4D4D" />
                      </svg>


                    </span>
                    <span
                      className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${viewable === 'Bank Accounts' ? 'text-[#FAFAFA]' : 'text-black'
                        }`}
                    >
                      Bank
                    </span>
                  </span>
                </span>
              </li>

              {/* <li className="relative mt-1 pt-1">
  <span
    className={
      'flex items-center text-sm px-2 py-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-[#F44D21] transition duration-300 ease-in-out cursor-pointer ' +
      (viewable === 'projectReports' ? 'bg-[#F44D21] w-100' : '')
    }
    onClick={() => setViewable('projectReports')}
    style={{
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    <span className="flex items-center flex-col">
      <span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
            fill={viewable === 'projectReports' ? 'white' : 'black'}
          />
        </svg>
      </span>
      <span 
        className={`text-[12px] font-manrope tracking-[0.7px] text-center pl-1 pt-1 ${
          viewable === 'projectReports' ? 'text-[#FAFAFA]' : 'text-black'
        }`}
      >
        Reports
      </span>
    </span>
  </span>
</li> */}


            </ul>
          </>
        )}


        {['marketingModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Today1')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Tasks</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              {/* start  */}

              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'MarketingSocial'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('MarketingSocial')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Marketing</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>

              {/* end */}
              {(user?.role?.includes(USER_ROLES.MARKETING_MANAGER) ||
                user?.role?.includes(USER_ROLES.MARKETING_EXECUTIVE) ||
                user?.role?.includes(USER_ROLES.ADMIN)) && (
                  <li className="relative mt-1">
                    <span
                      className={
                        'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                        (viewable === 'Team Lead Report'
                          ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                          : '')
                      }
                      onClick={() => setViewable('Team Lead Report')}
                      style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <span className="flex items-center flex-col pt-[8px]">
                        <span style={{ color: '#692fc2' }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none" fillRule="evenodd">
                              <g fill="currentColor" fillRule="nonzero">
                                <g>
                                  <g>
                                    <path
                                      d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                      transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>

                        <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Reports</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                      </span>
                    </span>
                  </li>
                )}
            </ul>
          </>
        )}
        {['salesModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Today1')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Home</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'inProgress'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('inProgress')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">
                      Visitors
                    </span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'archieveLeads'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('archieveLeads')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                      <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Archieve</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>


              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'units_inventory'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('units_inventory')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Stalls box2</span>
                  </span>
                </span>
              </li>





              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Team Lead Report'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Team Lead Report')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">
                      Visitor Report
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>

            </ul>
          </>
        )}
        {['legalModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Today1')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]">Tasks</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'legalDocuments'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('legalDocuments')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Documents</span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Team Lead Report'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Team Lead Report')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">
                      Team Reports
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}

        {['financeModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Today1'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Today1')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Tasks</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Payments'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Payments')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Payments</span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Bank Accounts'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Bank Accounts')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Bank</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Dashboard'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Dashboard')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Reports</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}
        {['hrModule'].includes(sourceLink) && (
          <>
            <ul className="w-full">
              <li className="relative justify-center ">
                <span
                  className={
                    'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'MyHR'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('MyHR')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor" fillRule="evenodd">
                          <path
                            fillRule="nonzero"
                            d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                            opacity=".1"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                          ></path>
                          <text
                            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                            fontSize="9"
                            transform="translate(4 2)"
                            fontWeight="500"
                          >
                            <tspan x="8" y="15" textAnchor="middle">
                              28
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Tasks</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'User Management'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('User Management')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                      <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Employees</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1 pt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'AssetsManagement'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('AssetsManagement')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Assets</span>
                  </span>
                </span>
              </li>

              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Bank Accounts'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Bank Accounts')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Bank</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Roles Management'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Roles Management')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.7px] pl-1">Access</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'projectReports'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('projectReports')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.7px]  pl-1">Reports</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}

        {/* <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 mt-auto rounded hover:bg-gray-300 ' +
          (pgName === 'erpAccount' ? 'bg-gray-300' : '')
        }
        // to={routes.erpAccount()}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link> */}


      </div>
    </section>
  )
}

export default SlimSideMenuBar
