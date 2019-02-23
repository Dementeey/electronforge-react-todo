import { connect } from 'react-redux'
import TodoList from '../elements/TodoList'

const mapStateToProps = state => ({
  // show: isOpenMetamaskSelector(state),
})

const actions = {
  // isOpenMetamask,
}

export default connect(
  mapStateToProps,
  actions,
)(TodoList)
