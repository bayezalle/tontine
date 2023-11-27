import React from 'react'
import './Tontine.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import ListTontine from './ListTontine'

const Tontine = () => {
  return (
    <div>
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
              <ListTontine/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tontine
