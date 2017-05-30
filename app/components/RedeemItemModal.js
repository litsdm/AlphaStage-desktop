// @flow
import React, { Component } from 'react';
import toastr from 'toastr';
import swal from 'sweetalert';
import $ from 'jquery';

type Props = {
  redeemKey: (key: string) => void,
  allowPlayer: (gameId: string, user: string) => void
};

class RedeemItemModal extends Component {

  submit: (e: SyntheticEvent | SyntheticMouseEvent) => void;

  static closeModal(e: SyntheticMouseEvent) {
    e.preventDefault();
    $('#redeemItemModal').modal('hide');
  }

  constructor(props: Props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.submit = this.submit.bind(this);
  }

  submit(e: SyntheticEvent | SyntheticMouseEvent) {
    e.preventDefault();

    const { redeemKey, allowPlayer } = this.props;

    const keyElem = (document.getElementById('keyInput'): any);
    const key = keyElem.value;

    redeemKey(key).then((res) => {
      if (!res.validKey) {
        toastr.error(res.message);
        throw new Error('Invalid key');
      } else {
        keyElem.value = '';
        switch (res.itemType) {
          case 'privateGame':
            swal('Redeem Successful!', `${res.game.name} is now available to download and play!`, 'success');
            break;
          default:
            break;
        }
        $('#redeemItemModal').modal('hide');
        allowPlayer(res.game._id, res.user);

        return Promise.resolve(res);
      }
    }).catch(() => {
      console.log('Error redeeming key');
    });
  }

  render() {
    return (
      <div className="modal fade" id="redeemItemModal" role="dialog">
        <div className="modal-dialog pim">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Redeem Key</h3>
              <a href="#close" className="close-btn" onClick={RedeemItemModal.closeModal}><i className="fa fa-times" /></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <label htmlFor="keyInput" className="input-tag">Key</label>
                <input id="keyInput" className="gf-input pim" type="text" />
              </div>
            </div>
            <div className="modal-footer pim">
              <a href="#redeem" className="btn play-btn" onClick={this.submit}>Redeem</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RedeemItemModal;
