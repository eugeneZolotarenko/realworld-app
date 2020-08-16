import React from "react"
import { css } from "@emotion/core"
import ClipLoader from "react-spinners/ClipLoader"

const override = css`
  display: block;
  margin: 30px auto;
  height: 70px;
  width: 70px;
  align-self: center;
`

export function Loader() {
  return (
    <ClipLoader css={override} size={150} color={"#5cb85c"} loading={true} />
  )
}

export function FullHeightLoader() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Loader />
    </div>
  )
}
