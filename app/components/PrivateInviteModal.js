// @flow
import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';

type Props = {
  invitePlayer: (email: string) => void
};

export default class PrivateInviteModal extends Component {

  submit: (e: SyntheticEvent | SyntheticMouseEvent) => void;

  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static closeModal(e) {
    e.preventDefault();
    $('#privateInviteModal').modal('hide');
  }

  constructor(props: Props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.submit = this.submit.bind(this);
  }

  submit(e: SyntheticEvent | SyntheticMouseEvent) {
    e.preventDefault();
    const { invitePlayer } = this.props;

    const emailElem = (document.getElementById('invEmail'): any);
    const email = emailElem.value;

    if (!PrivateInviteModal.validateEmail(email)) {
      toastr.error('Invalid email');
      return;
    }

    emailElem.value = '';

    invitePlayer(email);
  }

  render() {
    return (
      <div className="modal fade" id="privateInviteModal" role="dialog">
        <div className="modal-dialog pim">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Invite player</h3>
              <a href="#close" className="close-btn" onClick={PrivateInviteModal.closeModal}><i className="fa fa-times" /></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <label htmlFor="invEmail" className="input-tag">EMAIL</label>
                <input className="gf-input pim" type="text" id="invEmail" />
              </div>
            </div>
            <div className="modal-footer pim">
              <a href="#submit" className="btn play-btn" onClick={this.submit}>Send invite</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
