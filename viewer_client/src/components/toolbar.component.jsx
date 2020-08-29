import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useSelector } from 'react-redux'
import { getNextAddress } from '../utils'
import { Link } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  signOutBtn: {
    marginLeft: '10px',
  },
  link: {

  }
}))

const ToolbarComponent = () => {
  const classes = useStyles()
  const history = useHistory()
  const service = useSelector(state => state.service)
  const currentAddress = useSelector(state => state.address.currentAddress)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleSettingsMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSettingsClose = () => {
    setAnchorEl(null)
  }

  const handleNextButton = () => {
    history.push(getNextAddress(currentAddress, service.name))
  }

  return (
      <AppBar position='static' className='appBar'>
        <Toolbar>
          <Typography className='title' variant='h5' noWrap>
            Image Browser
          </Typography>
          <div className={classes.grow} />
          <Link variant='body2'
                target='_blank'
                rel='noopener noreferrer'
                color='inherit'
                href={ `${ service.address }/${ currentAddress }` }
          >
            {`${service.address}/${currentAddress}`}
          </Link>
          <div className={classes.grow} />
          <div>
            <IconButton
                aria-label='view next image'
                color='inherit'
                onClick={handleSettingsMenu}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id='settings-menu'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleSettingsClose}
              >
              <MenuItem onClick={handleSettingsClose}>prnt.sc</MenuItem>
            </Menu>
          </div>

          <Button
            variant='contained'
            size='large'
            className={classes.signOutBtn}
            onClick={handleNextButton}
            endIcon={<KeyboardArrowRightIcon />}
            >
            Next
          </Button>
        </Toolbar>
      </AppBar>
  )
}

export default ToolbarComponent