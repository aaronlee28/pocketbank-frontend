export default function PromotionPatch(props) {
  const {
    promo,
    PatchSubmitHandler,
    formTitle,
    changeTitle,
    changeId,
    changePromotion,

  } = props;

  return (
    <div>
      <input className="formInputlogreg nameInput" type="text" value={formTitle} placeholder={promo.title} onChange={changeTitle} />
      <input className="formInputlogreg nameInput" type="text" value={promo.id} placeholder={promo.title} onChange={changeId} />
      <input className="form-input-patch contactInput promo-input" type="file" onChange={changePromotion} />
      <button className="submit-promo" value={promo.id} type="button" onClick={PatchSubmitHandler}>Submit</button>
    </div>

  );
}
