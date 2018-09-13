import React, { Component } from 'react'
import { Button, Icon, Image } from 'semantic-ui-react'
class Preview extends Component {
  render () {
    return (
      this.props.show && <div style={{background: '#E4E4E4', height: '600px'}}>
        <div className='m-quick-sidebar__content'>
          <div className='tab-content'>
            <div className='tab-pane active m-scrollable' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages' />
                <div style={{width: '100%', background: '#00CCA5', height: '50px', padding: '10px', color: 'white', verticalAlign: 'center'}}>
                  <Icon name='close' />
                  <h4> Preview </h4>
                </div>
                <center style={{padding: '25px'}}>
                  <Image src='http://4.bp.blogspot.com/-o7Sa1IF4FE8/VjIZeuLWCjI/AAAAAAAAkTE/5h-pOqeOqpU/s1600/Abstract%2BPainting%2BHD%2BWallpapers%2B1.jpg' />
                  <input placeholder='Add a caption...' style={{'fontSize': '18px',
                    'margin': '15px',
                    'marginTop': '50px',
                    'background': '#E4E4E4',
                    'border': '0',
                    'borderBottom': 'solid #00CCA5 2px',
                    'color': 'grey',
                    'width': '80%',
                    'outline': 'none'

                  }} />
                  <Button circular icon='send' size='large' color='green' />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Preview
