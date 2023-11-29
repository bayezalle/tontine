import React from 'react'
import { FaSearch } from 'react-icons/fa'

const headMain = () => {
  return (
    <div>
      <div className="d-flex justify-content-between mt-5 gap-5">
          <div>
            <h1>Tontines</h1>
          </div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recherche"
              aria-label="Recherche"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
    </div>
  )
}

export default headMain
