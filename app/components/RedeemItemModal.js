import React, { Component } from 'react';
import { push } from 'react-router-redux';
import toastr from 'toastr';
import swal from 'sweetalert';
import $ from 'jquery';

export default class RedeemItemModal extends Component {
  constructor(props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();

    const { redeemKey, allowPlayer } = this.props;

    const key = this.refs.keyRef.value;

    redeemKey(key).then((res) => {
      if (!res.validKey) {
        toastr.error(res.message);
      }
      else {
        this.refs.keyRef.value = "";
        switch (res.itemType) {
          case 'privateGame':
            swal("Redeem Successful!", `${res.game.name} is now available to download and play!`, "success");
            break;
          default:
            break;
        }
        $('#redeemItemModal').modal('hide');
        allowPlayer(res.game._id, res.user)
      }
    })
  }

  closeModal(e) {
    e.preventDefault();
    $('#redeemItemModal').modal('hide');
  }

  render() {
    return (
      <div className="modal fade" id="redeemItemModal" role="dialog">
        <div className="modal-dialog pim">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Redeem Key</h3>
              <a href="#" className="close-btn" onClick={this.closeModal}><i className="fa fa-times"></i></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <label className="input-tag">Key</label>
                <input className="gf-input pim" type="text" ref="keyRef" />
              </div>
            </div>
            <div className="modal-footer pim">
              <a href="#" className="btn play-btn" onClick={this.submit}>Redeem</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
