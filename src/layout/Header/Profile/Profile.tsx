import { Logout20 } from "@carbon/icons-react";
import { utilService } from "core/services/common-services/util-service";
import "./Profile.scss";
import avatar from "assets/images/avatar.jpg";
import { useRef } from "react";

const Profile = (props: any) => {
  const { user, setActiveProfile } = props;
  const ref: any = useRef();

  utilService.useClickOutside(ref, () => setActiveProfile(false));
  return (
    <>
      <div className="header-user__menu" ref={ref}>
        <div className="header-user__menu-item header-user__item-first d-flex justify-content-start align-items-center">
          <div className="header-user__menu-avatar p-l--sm">
            <img src={avatar} alt="" />
          </div>
          <div className="header-user__menu-title">
            <span>{utilService.limitWord(user?.displayName, 30)}</span>
            <span className="header-user__username">
              {utilService.limitWord(user?.username, 30)}
            </span>
          </div>
        </div>
        <div className="header-user__menu-actions">
          <div className="header-user__menu-item">Đổi mật khẩu</div>
          <div className="header-user__menu-item">Đổi ngôn ngữ</div>
        </div>
        <div className="header-user__menu-item header-user__item-end d-flex justify-content-between align-items-center">
          <div>Đăng xuất</div>
          <div>
            <Logout20 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
