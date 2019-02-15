// local storage browser api
// look into local storage by key retrieve a string and 
// try to parse it as json
// have to use try catch block because local storage could because
// disabled

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null){
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}