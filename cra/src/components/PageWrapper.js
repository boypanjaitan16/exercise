import {connect, useStore} from 'react-redux'
import React, {createRef, useEffect, useState} from 'react'
import {
    HomeOutlined, 
    UserOutlined, 
    LogoutOutlined, 
    SettingOutlined, 
    CopyrightCircleOutlined,
    EditOutlined,
    MenuOutlined
} from '@ant-design/icons'
import {
    Dialog, 
    Slide, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button,
} from '@material-ui/core'
import {clearSession} from '../redux/action'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function PageWrapper({user, children}){

    const navRef    = createRef()
    const sideRef   = createRef()
    const store     = useStore()
    const [navHeight, setNavHeight]     = useState(0)
    const [sideWidth, setSideWidth]     = useState(0)
    const [sideHeight, setSideHeight]   = useState(0)
    const [openLogoutModal, setLogoutModal] = useState(false)
    const [openDrawer, setOpenDrawer]   = useState(false)
    const [sideLinks, setSideLinks] = useState([
        {
            title   : 'Dashboard',
            link    : '#/account',
            active  : true,
            icon    : <HomeOutlined/>
        },
        {
            title   : 'Activities',
            link    : '#/account/activities',
            icon    : <SettingOutlined/>
        },
        {
            title   : 'Profile',
            link    : '#/account/profile',
            icon    : <UserOutlined/>
        }
    ])

    useEffect(() => {
        setNavHeight(navRef.current?.clientHeight)
        setSideWidth(sideRef.current?.clientWidth)
        setSideHeight(sideRef.current?.clientHeight)
    }, [navRef, sideRef])

    useEffect(() => {
        const handleResize = () => {
            setNavHeight(navRef.current?.clientHeight)
            setSideWidth(sideRef.current?.clientWidth)
            setSideHeight(sideRef.current?.clientHeight)
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const handleClose = () => {
        setLogoutModal(false)
    }

    const clickSideLink = (idx) => {
        const newLinks  = sideLinks.map((item, index) => {
            // we do not care about this item, skip
            if (index !== idx) return {...item, active : false}
            // we want to edit this item
            return { ...item, active : true }
        })
        setSideLinks(newLinks)
        setOpenDrawer(false)
    }

    return (
        <>
            <Dialog
                open={openLogoutModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Sign-out</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure want to sign-out from your current session?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => store.dispatch(clearSession())} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <nav ref={navRef} className='w-full items-stretch fixed top-0 z-50 bg-blue-400 md:bg-white flex px-5 py-3 md:px-8 md:py-4 md:border-b border-gray-300'>
                {/* <div className=''> */}
                    <button 
                        onClick={() => setOpenDrawer(!openDrawer)} 
                        className='text-white md:hidden flex-none flex items-center focus:outline-none text-2xl'>
                        <MenuOutlined/>
                    </button>
                {/* </div> */}
                <div className='flex-grow flex justify-items-center'>
                    <h4 className='text-lg md:text-2xl w-full text-white md:text-black mb-0 font-semibold text-center md:text-left'>{process.env.REACT_APP_APP_NAME}</h4>
                </div>
                <div className='flex-none md:ml-5 flex items-center'>
                    <a 
                        href='#/account/add-record' 
                        onClick={() => clickSideLink(-1)} 
                        className='rounded-full hidden  sm:block bg-blue-400 px-5 py-2 hover:bg-blue-500 hover:text-white text-white'>
                        Add Record
                    </a>
                    <a 
                        onClick={() => clickSideLink(-1)}
                        className='md:hidden text-2xl text-white flex items-center hover:text-white' 
                        href='#/account/add-record'>
                        <EditOutlined/>
                    </a>
                </div>
            </nav>
            <div style={{ paddingTop: navHeight}} className='relative block'>
                <div ref={sideRef} style={{height: `calc(100vh - ${navHeight+2}px)`}} className={`fixed ${!openDrawer ? 'hidden md:flex' : 'flex'} z-40 flex-col w-8/12 sm:w-4/12 md:w-3/12 bg-white border-r border-gray-300 p-3 md:p-5`}>
                    <ul className='flex-grow'>
                        {sideLinks.map((item, index) => (
                            <li key={index}>
                                <a href={item.link} onClick={() => clickSideLink(index)} className={`a-sidebar-item ${item.active && 'font-semibold text-blue-500'}`}>
                                    {item.icon} <span>{item.title}</span>
                                </a>
                            </li>
                        ))}
                        
                        <li>
                            <button onClick={() => setLogoutModal(true)} className='a-sidebar-item'>
                                <LogoutOutlined/> <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                    <div className='flex items-center text-gray-400'>
                        <span className='hidden md:block'>Copyright</span> <CopyrightCircleOutlined className='mx-1'/> {new Date().getFullYear()} &nbsp;.&nbsp; <a href='#/' className='text-blue-500'>Homepage</a>
                    </div>
                </div>
                <div 
                    style={{marginLeft: openDrawer ? 0 : sideWidth, height: sideHeight === 0 ? `calc(100vh - ${navHeight}px)` : sideHeight}} 
                    className='flex-grow p-5 md:pr-8 block'>
                    {children}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user    : state.session.user
    }
}

export default connect(mapStateToProps)(PageWrapper)