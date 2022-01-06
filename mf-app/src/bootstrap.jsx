import React from 'react'
import ReactDOM from 'react-dom'
import ComponentA from 'mf-component/src/ComponentA'

let root = document.createElement('div')
document.body.append(root)
ReactDOM.render(<ComponentA />, root)