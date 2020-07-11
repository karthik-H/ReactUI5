Luigi.setConfig({
  navigation: {
    viewGroupSettings: {
      item: {
        preloadUrl: '/sampleapp.html#/item-list',
      }
    },
    nodes: () => [
      {
        pathSegment: 'admin-home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'dashboard',
            label: 'Dashboard',
            icon: 'bbyd-dashboard',
            viewUrl: '/sampleapp.html#/dashboard'
          },
          {
            navigationContext: 'itemDetails',
            viewGroup: 'item',
            label: 'Item Details',
            category: {
              label: 'Item Info',
              icon: 'blank-tag-2',
              collapsible: true
            },
            pathSegment: '#itemDetails',
            viewUrl: '/sampleapp.html#/item-list'
          },
          {
            viewGroup: '#item',
            label: 'Item Category',
            category: {
              label: 'Item Info',
              icon: 'blank-tag-2',
              collapsible: true
            },
            navigationContext: 'itemCategory',
            pathSegment: '#itemCategory',
            viewUrl: '/sampleapp.html#/item-list'
          },
          {
            viewGroup: 'item',
            label: 'Item SubCategory',
            category: {
              label: 'Item Info',
              icon: 'blank-tag-2',
              collapsible: true
            },
            navigationContext: 'itemSubcategory',
            pathSegment: 'itemSubcategory',
            viewUrl: '/sampleapp.html#/item-list'
          },
          {
            viewGroup: 'item',
            hideSideNav: true,
            category: {
              label: 'Item Info',
              icon: 'blank-tag-2',
              collapsible: true
            },
            navigationContext: 'itemAvailability',
            pathSegment: 'itemAvailability',
            viewUrl: '/sampleapp.html#/item-list'
          },
          {
            viewGroup: 'item',
            label: 'object view page',
            hideFromNav: true,
            hideSideNav: true,
            pathSegment: 'objectPage/:id',
            context: {
              id: ':id'
            },
            viewUrl: '/sampleapp.html#/object-form'
          },
          {
            pathSegment: 'configure-order',
            label: 'Orders',
            category: {
              label: 'Configure',
              icon: 'provision',
              collapsible: true
            },
            loadingIndicator: {
              enabled: false
            },
            viewUrl: '/sampleapp.html#/sample1'
          }, {
            pathSegment: 'user-order-pending',
            label: 'Pending UserOrder',
            category: {
              label: 'UserOrders',
              icon: 'my-sales-order',
              collapsible: true
            },
            loadingIndicator: {
              enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
          }, {
            pathSegment: 'user-order-complete',
            label: 'Completed UserOrder',
            category: 'UserOrders',
            loadingIndicator: {
              enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
          }, {
            pathSegment: 'user-order-cancel',
            label: 'Cancelled UserOrder',
            category: 'UserOrders',
            loadingIndicator: {
              enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
          }, {
            pathSegment: 'user-order-approve',
            label: 'Approve UserOrder',
            category: 'UserOrders',
            loadingIndicator: {
              enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
          }
        ]
      }
    ]
  },
  routing: {
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'StoreName',
      logo: 'https://res.cloudinary.com/dsywyhhdl/image/upload/v1590678445/Capture_tndec6.png',
      favicon: 'https://res.cloudinary.com/dsywyhhdl/image/upload/v1590678445/Capture_tndec6.png'
    },
    sideNavFooterText: ' © By Initializers',
    responsiveNavigation: 'simpleMobileOnly'
  }
});
