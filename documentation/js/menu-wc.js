'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' : 'data-target="#xs-components-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' :
                                            'id="xs-components-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EbookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EbookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' : 'data-target="#xs-directives-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' :
                                        'id="xs-directives-links-module-AppModule-5db4c31a6d628ed77b41fde07bd0ca1fbd361f5351e2ae59a8a343e7f0046d5d737f3a6acf59ed5980891c1d2386daeb17148551624e3f9961d4d75a16edd58c"' }>
                                        <li class="link">
                                            <a href="directives/StatusDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookModule.html" data-type="entity-link" >BookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' : 'data-target="#xs-components-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' :
                                            'id="xs-components-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' }>
                                            <li class="link">
                                                <a href="components/AddBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookNumberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticsBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBookComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' : 'data-target="#xs-injectables-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' :
                                        'id="xs-injectables-links-module-BookModule-8e654ac08245929dccd084d3219b1ca08504abbac305a7ff8b9e2e32748158728e882fdbc888dcb40493db2fe7babf179973c35229f9c80ad3e511906068eb2b"' }>
                                        <li class="link">
                                            <a href="injectables/BookValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' : 'data-target="#xs-components-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' :
                                            'id="xs-components-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                            <li class="link">
                                                <a href="components/AddCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalCategoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' : 'data-target="#xs-injectables-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' :
                                        'id="xs-injectables-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryTestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryTestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryValidation</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' : 'data-target="#xs-pipes-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' :
                                            'id="xs-pipes-links-module-CategoryModule-dac9b2d7bfb7fa431ab7b8dca159d7e700c9de2bcf6b8f77ea668580ac7c0c01a31a456e39d19042161a1c7559fee39756b40ed9fe333bd38a79093ef8c9a4a0"' }>
                                            <li class="link">
                                                <a href="pipes/TitlecapitalPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitlecapitalPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CirculationsModule.html" data-type="entity-link" >CirculationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' : 'data-target="#xs-components-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' :
                                            'id="xs-components-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' }>
                                            <li class="link">
                                                <a href="components/AddCirculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCirculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCirculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCirculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCirculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewCirculationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' : 'data-target="#xs-injectables-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' :
                                        'id="xs-injectables-links-module-CirculationsModule-1f00d88cfa86ba5d85605d688fc84ef1174289b9ffcd030b285ac016c2e6ee454e181ed30c499561aab8c53b9e48f05592ab3f57a6f30ea88ff19e701f76836f"' }>
                                        <li class="link">
                                            <a href="injectables/CirculationValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CirculationStatusModule.html" data-type="entity-link" >CirculationStatusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' : 'data-target="#xs-components-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' :
                                            'id="xs-components-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' }>
                                            <li class="link">
                                                <a href="components/AddCirculationStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCirculationStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationStatusListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationStatusListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirculationStatusModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationStatusModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCirculationStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCirculationStatusComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' : 'data-target="#xs-injectables-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' :
                                        'id="xs-injectables-links-module-CirculationStatusModule-296b72fdb033e991960498c3c0cec8bf9914ed15fdb11e375920f2545f921fe6ca256bb90d73d1fd19859a19982288ca991e5721111bde00465a55997423095f"' }>
                                        <li class="link">
                                            <a href="injectables/CirculationStatusValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CirculationStatusValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EbooksModule.html" data-type="entity-link" >EbooksModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MemberrModule.html" data-type="entity-link" >MemberrModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' : 'data-target="#xs-components-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' :
                                            'id="xs-components-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' }>
                                            <li class="link">
                                                <a href="components/AddMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemberListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemberModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewMemberComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' : 'data-target="#xs-injectables-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' :
                                        'id="xs-injectables-links-module-MemberrModule-3c44e108640966debcadec6cfda3f343fa6990bbd5514dc976596bb10fec27ce0bde5d8c7f9da24713ff41f915ff1bc62f595900fce3c1dc95dc13d69d82f69e"' }>
                                        <li class="link">
                                            <a href="injectables/MemberValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemberValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublishersModule.html" data-type="entity-link" >PublishersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' : 'data-target="#xs-components-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' :
                                            'id="xs-components-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' }>
                                            <li class="link">
                                                <a href="components/AddPublisherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPublisherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPublisherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPublisherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublisherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublisherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublisherListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublisherListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublisherModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublisherModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' : 'data-target="#xs-injectables-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' :
                                        'id="xs-injectables-links-module-PublishersModule-af4bc584f3040e21281e7077fc603678249f81194bcf35c13be4fd11384d883d3777a635d73412ae189e89ccc7a8f8b7c29977396328d998143c4991b540803b"' }>
                                        <li class="link">
                                            <a href="injectables/PublisherValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublisherValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestedBooksModule.html" data-type="entity-link" >RequestedBooksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' : 'data-target="#xs-components-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' :
                                            'id="xs-components-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' }>
                                            <li class="link">
                                                <a href="components/AddRequestedBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddRequestedBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditRequestedBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditRequestedBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestedBookListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestedBookListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestedBookModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestedBookModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequiredBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequiredBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewRequestedBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewRequestedBookComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' : 'data-target="#xs-injectables-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' :
                                        'id="xs-injectables-links-module-RequestedBooksModule-cd4d71695e48fa09b67ac2d809fcb545489a201400e6921a10c982706b8b4a77c84a8dbb761f103e36d1e8284d5f9a0ae427b7a72f29cccbbbb071063bbd31bb"' }>
                                        <li class="link">
                                            <a href="injectables/RequestedBookValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestedBookValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-81604889280637ca8465ede384c57f1da6e077f295dbe09ae21aa11ea42374503822bb0224eda2619c93d8bf219c6e3b32d5ed7352562100348750f00bdc1f2f"' : 'data-target="#xs-components-links-module-SettingsModule-81604889280637ca8465ede384c57f1da6e077f295dbe09ae21aa11ea42374503822bb0224eda2619c93d8bf219c6e3b32d5ed7352562100348750f00bdc1f2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-81604889280637ca8465ede384c57f1da6e077f295dbe09ae21aa11ea42374503822bb0224eda2619c93d8bf219c6e3b32d5ed7352562100348750f00bdc1f2f"' :
                                            'id="xs-components-links-module-SettingsModule-81604889280637ca8465ede384c57f1da6e077f295dbe09ae21aa11ea42374503822bb0224eda2619c93d8bf219c6e3b32d5ed7352562100348750f00bdc1f2f"' }>
                                            <li class="link">
                                                <a href="components/EditSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' : 'data-target="#xs-components-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' :
                                            'id="xs-components-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' }>
                                            <li class="link">
                                                <a href="components/AddButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' : 'data-target="#xs-injectables-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' :
                                        'id="xs-injectables-links-module-SharedModule-08f8325df0198d02125bcd37d4e3f132ee054c347c332760c0a25c9920526040ae152688015f01f625699ae10a8b645ca95870500b3255e1f762023af0a13c17"' }>
                                        <li class="link">
                                            <a href="injectables/AuthentificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthentificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TypememberModule.html" data-type="entity-link" >TypememberModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' : 'data-target="#xs-components-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' :
                                            'id="xs-components-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' }>
                                            <li class="link">
                                                <a href="components/AddTypeMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddTypeMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditTypeMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditTypeMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalTypeMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalTypeMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TypeMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypeMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TypememberListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypememberListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' : 'data-target="#xs-injectables-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' :
                                        'id="xs-injectables-links-module-TypememberModule-781da91028ff2c86c51d8adb92b66aadd65e8a8548019881b3655e712e29324f1109fc70a6d9422b6b73cfb3979a40bab40fbf000b53cf8c209bd0fe6d1b71a9"' }>
                                        <li class="link">
                                            <a href="injectables/TypeMemberValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypeMemberValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WriterModule.html" data-type="entity-link" >WriterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' : 'data-target="#xs-components-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' :
                                            'id="xs-components-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' }>
                                            <li class="link">
                                                <a href="components/AddWriterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddWriterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditWriterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditWriterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WriterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WriterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WriterListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WriterListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WriterModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WriterModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' : 'data-target="#xs-injectables-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' :
                                        'id="xs-injectables-links-module-WriterModule-fd96b18a4e8acee714541bcd785b5c29f429c9ba2dedbd630818392c0f2c0393802cc300f70a5b97c469c4f3c0b26e010656405a83f9d0d662b51739e0fdd7cb"' }>
                                        <li class="link">
                                            <a href="injectables/WriterValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WriterValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AddEbookComponent.html" data-type="entity-link" >AddEbookComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EbookListComponent.html" data-type="entity-link" >EbookListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EbookModalComponent.html" data-type="entity-link" >EbookModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditEbookComponent.html" data-type="entity-link" >EditEbookComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StatisticMemberComponent.html" data-type="entity-link" >StatisticMemberComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Archive.html" data-type="entity-link" >Archive</a>
                            </li>
                            <li class="link">
                                <a href="classes/Book.html" data-type="entity-link" >Book</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookAnalytics.html" data-type="entity-link" >BookAnalytics</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookCategoryAnalytics.html" data-type="entity-link" >BookCategoryAnalytics</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Circulation.html" data-type="entity-link" >Circulation</a>
                            </li>
                            <li class="link">
                                <a href="classes/CirculationStatus.html" data-type="entity-link" >CirculationStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/CONFIG.html" data-type="entity-link" >CONFIG</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardAnalytics.html" data-type="entity-link" >DashboardAnalytics</a>
                            </li>
                            <li class="link">
                                <a href="classes/EBook.html" data-type="entity-link" >EBook</a>
                            </li>
                            <li class="link">
                                <a href="classes/Member.html" data-type="entity-link" >Member</a>
                            </li>
                            <li class="link">
                                <a href="classes/Publisher.html" data-type="entity-link" >Publisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestedBook.html" data-type="entity-link" >RequestedBook</a>
                            </li>
                            <li class="link">
                                <a href="classes/Settings.html" data-type="entity-link" >Settings</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeMember.html" data-type="entity-link" >TypeMember</a>
                            </li>
                            <li class="link">
                                <a href="classes/URLLoader.html" data-type="entity-link" >URLLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/Wastage.html" data-type="entity-link" >Wastage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Writer.html" data-type="entity-link" >Writer</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthentificationService.html" data-type="entity-link" >AuthentificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookFilterValidation.html" data-type="entity-link" >BookFilterValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookMessage.html" data-type="entity-link" >BookMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookMessage-1.html" data-type="entity-link" >BookMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookTestService.html" data-type="entity-link" >BookTestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookValidation.html" data-type="entity-link" >BookValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryMessage.html" data-type="entity-link" >CategoryMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryTestService.html" data-type="entity-link" >CategoryTestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryValidation.html" data-type="entity-link" >CategoryValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CirculationMessage.html" data-type="entity-link" >CirculationMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CirculationStatusMessage.html" data-type="entity-link" >CirculationStatusMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CirculationStatusValidation.html" data-type="entity-link" >CirculationStatusValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CirculationValidation.html" data-type="entity-link" >CirculationValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EBookValidation.html" data-type="entity-link" >EBookValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HTTPService.html" data-type="entity-link" >HTTPService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemberMessage.html" data-type="entity-link" >MemberMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemberTestService.html" data-type="entity-link" >MemberTestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemberTypeMessage.html" data-type="entity-link" >MemberTypeMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemberTypeTestService.html" data-type="entity-link" >MemberTypeTestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemberValidation.html" data-type="entity-link" >MemberValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublisherMessage.html" data-type="entity-link" >PublisherMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublisherValidation.html" data-type="entity-link" >PublisherValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestedBookMessage.html" data-type="entity-link" >RequestedBookMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestedBookValidation.html" data-type="entity-link" >RequestedBookValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsMessage.html" data-type="entity-link" >SettingsMessage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeMemberValidation.html" data-type="entity-link" >TypeMemberValidation</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WriterValidation.html" data-type="entity-link" >WriterValidation</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthguardService.html" data-type="entity-link" >AuthguardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Service.html" data-type="entity-link" >Service</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});