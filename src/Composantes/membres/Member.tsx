import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import List from './List'

const Member = () => {
  return (
    <div className="container-fluid px-0">
        <div className="row g-0 ">
          <div className="col-lg-3 col-md-1 col-sm-1 col-xs-1">
            <Sidebar/>
          </div>
          <div className="col-lg-9 col-md-11 col-sm-11 col-xs-11">
            <div>
              <Header/>
            </div>
            <div>
              <List/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Member
