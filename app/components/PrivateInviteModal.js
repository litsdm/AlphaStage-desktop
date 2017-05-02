import React, { Component } from 'react';
import toastr from 'toastr';

export default class PrivateInviteModal extends Component {
  constructor(props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { invitePlayer } = this.props;

    const email = this.refs.emailRef.value;

    if (!this.validateEmail(email)) {
      toastr.error("Invalid email");
      return
    }

    this.refs.emailRef.value = "";

    invitePlayer(email);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  closeModal(e) {
    e.preventDefault();
    $('#privateInviteModal').modal('hide');
  }

  render() {
    return (
      <div className="modal fade" id="privateInviteModal" role="dialog">
        <div className="modal-dialog pim">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Invite player</h3>
              <a href="#" className="close-btn" onClick={this.closeModal}><i className="fa fa-times"></i></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <label className="input-tag">EMAIL</label>
                <input className="gf-input pim" type="text" ref="emailRef" />
              </div>
            </div>
            <div className="modal-footer pim">
              <a href="#" className="btn play-btn" onClick={this.submit}>Send invite</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
