import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import {
  getCategories,
  getCategoriesMenu,
  selectCategories,
  selectNav,
} from 'app/store/homeSlice';

function Navigation(props) {
  const dispatch = useDispatch();
  const navigation = useSelector(selectNavigation);
  const navCategories = useSelector(selectNav);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  let newNav = [];

  useEffect(() => {
    dispatch(getCategoriesMenu());
  }, []);

  return useMemo(() => {
    function handleItemClick(item) {
      if (isMobile) {
        dispatch(navbarCloseMobile());
      }
    }

    console.log(newNav, 'newNav');

    return (
      <FuseNavigation
        className={clsx('navigation', props.className)}
        navigation={navCategories}
        layout={props.layout}
        dense={props.dense}
        active={props.active}
        onItemClick={handleItemClick}
      />
    );
  }, [
    dispatch,
    isMobile,
    navCategories,
    props.active,
    props.className,
    props.dense,
    props.layout,
  ]);
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default memo(Navigation);
