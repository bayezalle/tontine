import React from 'react'
import { FaSearch } from 'react-icons/fa'

const ListTontine = () => {
  return (
    <div className='container pt-5 mt-3'>
      <div className="row">
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
      <div className="row">
        <div className="d-flex justify-content-end gap-5 align-items-baseline">
          <p>Ajouter une tontine :</p>
          <button
            type="button"
            className="px-2 rounded text-light fs-5 fw-bold add-member"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListTontine
