import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class InvitationSelector extends LightningElement {
  @api unansweredCount = 0;
  @api acceptedCount = 0;
  @api selectedInviteType;

  showUnanswered = false;
  showAccepted = false;

  connectedCallback() {
    this.evaluateVisibility();
  }

  evaluateVisibility() {
    const unanswered = Number(this.unansweredCount) || 0;
    const accepted = Number(this.acceptedCount) || 0;

    this.showUnanswered = unanswered > 0;
    this.showAccepted = accepted > 0;

    if (unanswered === 0 && accepted === 0) {
      this.selectedInviteType = null;
    } else if (unanswered === 0 && accepted > 0) {
      this.selectedInviteType = 'accepted';
    } else {
      this.selectedInviteType = 'unanswered'; // covers the >0/0 and >0/>0 cases
    }

    this.dispatchFlowValueChange();
  }

  get unansweredCircleClass() {
    return `circle ${this.selectedInviteType === 'unanswered' ? 'selected' : ''}`;
  }

  get acceptedCircleClass() {
    return `circle ${this.selectedInviteType === 'accepted' ? 'selected' : ''}`;
  }

  handleUnansweredClick() {
    this.selectedInviteType = 'unanswered';
    this.dispatchFlowValueChange();
  }

  handleAcceptedClick() {
    this.selectedInviteType = 'accepted';
    this.dispatchFlowValueChange();
  }

  dispatchFlowValueChange() {
    this.dispatchEvent(
      new FlowAttributeChangeEvent('selectedInviteType', this.selectedInviteType)
    );
  }
  get unansweredCircleClass() {
    const base = 'circle';
    const selected = this.selectedInviteType === 'unanswered';
    const attract = this.unansweredCount > 0 && !selected ? 'attention' : '';
    return `${base} ${selected ? 'selected' : ''} ${attract}`;
  }
  
  get acceptedCircleClass() {
    const base = 'circle';
    const selected = this.selectedInviteType === 'accepted';
    const attract = this.acceptedCount > 0 && !selected ? 'attention' : '';
    return `${base} ${selected ? 'selected' : ''} ${attract}`;
  }
  

}

