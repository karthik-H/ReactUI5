Luigi.setConfig({
  navigation: {
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
          },{ 
            pathSegment: 'item-details', 
            label: 'Item Details', 
            category: {
                label: 'Item Info',
                icon: 'blank-tag-2',
                collapsible: true
            },
            loadingIndicator: {
                enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
        },{ 
            pathSegment: 'category', 
            label: 'Item Category', 
            category: 'Item Info',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: '/initializers.html#/sample2'
        },{ 
          pathSegment: 'sub-category', 
          label: 'Item Sub-Category', 
          category: 'Item Info',
          loadingIndicator: {
              enabled: false
          },
          viewUrl: '/initializers.html#/sample2'
      },{ 
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
          viewUrl: '/initializers.html#/sample2'
      },{ 
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
    },{ 
      pathSegment: 'user-order-complete', 
      label: 'Completed UserOrder', 
      category: 'UserOrders',
      loadingIndicator: {
          enabled: false
      },
      viewUrl: '/initializers.html#/sample2'
  },{ 
    pathSegment: 'user-order-cancel', 
    label: 'Cancelled UserOrder', 
    category: 'UserOrders',
    loadingIndicator: {
        enabled: false
    },
    viewUrl: '/initializers.html#/sample2'
},{ 
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
  settings: {
    header: {
      title: 'StoreName',
      logo: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/8f/1c/a7/shutterstock-757437973.jpg',
      favicon: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/8f/1c/a7/shutterstock-757437973.jpg'
    },
    sideNavFooterText: ' © By Initializers',
    responsiveNavigation: 'simpleMobileOnly'
  }
});
