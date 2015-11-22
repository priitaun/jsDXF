/* jsDXF.js
 * Javascript version of writing DXF file.
 * 2015-11-15
 *
 * By Priit Aun,
 * License: MIT
 */

/*sequence of file: HEADER, TABLES, BLOCKS, ENTITIES*/

var jsDXF = (function () {

    var handle = 0; //needs to added up every time new entity is created

    //handle - number that must be unique throuh the drawing
    function handle() {
        return handle += 1;
    }

    var header = function (EXTMIN_X, EXTMIN_Y, EXTMAX_X, EXTMAX_Y) {

        //zoom level of wiev when opening drawing, if no argument given use default values
        EXTMIN_X = EXTMIN_X || '0';
        EXTMIN_Y = EXTMIN_Y || '0';
        EXTMAX_X = EXTMAX_X || '20000';
        EXTMAX_Y = EXTMAX_Y || '20000';

        var currentHandle = handle().toString(16).toUpperCase(); //must be biggest of all handles in dxf file, should be last calculated handle number

        //compose the file header section
        var h ='  0\r\nSECTION\r\n  2\r\nHEADER\r\n  9\r\n$ACADVER\r\n  1\r\nAC1009\r\n  9\r\n$INSBASE\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$EXTMIN\r\n 10\r\n'
                + EXTMIN_X + '\r\n 20\r\n'
                + EXTMIN_Y + '\r\n 30\r\n0.0\r\n  9\r\n$EXTMAX\r\n 10\r\n'
                + EXTMAX_X + '\r\n 20\r\n'
                + EXTMAX_Y + '\r\n 30\r\n0.0\r\n  9\r\n$LIMMIN\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n  9\r\n$LIMMAX\r\n 10\r\n420.0\r\n 20\r\n297.0\r\n  9\r\n$ORTHOMODE\r\n 70\r\n     0\r\n  9\r\n$REGENMODE\r\n 70\r\n     1\r\n  9\r\n$FILLMODE\r\n 70\r\n     1\r\n  9\r\n$QTEXTMODE\r\n 70\r\n     0\r\n  9\r\n$MIRRTEXT\r\n 70\r\n     0\r\n  9\r\n$DRAGMODE\r\n 70\r\n     2\r\n  9\r\n$LTSCALE\r\n 40\r\n1.0\r\n  9\r\n$OSMODE\r\n 70\r\n  3007\r\n  9\r\n$ATTMODE\r\n 70\r\n     1\r\n  9\r\n$TEXTSIZE\r\n 40\r\n2.5\r\n  9\r\n$TRACEWID\r\n 40\r\n1.0\r\n  9\r\n$TEXTSTYLE\r\n  7\r\nSTANDARD\r\n  9\r\n$CLAYER\r\n  8\r\n0\r\n  9\r\n$CELTYPE\r\n  6\r\nBYLAYER\r\n  9\r\n$CECOLOR\r\n 62\r\n   256\r\n  9\r\n$DIMSCALE\r\n 40\r\n1.0\r\n  9\r\n$DIMASZ\r\n 40\r\n2.5\r\n  9\r\n$DIMEXO\r\n 40\r\n0.625\r\n  9\r\n$DIMDLI\r\n 40\r\n3.75\r\n  9\r\n$DIMRND\r\n 40\r\n0.0\r\n  9\r\n$DIMDLE\r\n 40\r\n0.0\r\n  9\r\n$DIMEXE\r\n 40\r\n1.25\r\n  9\r\n$DIMTP\r\n 40\r\n0.0\r\n  9\r\n$DIMTM\r\n 40\r\n0.0\r\n  9\r\n$DIMTXT\r\n 40\r\n2.5\r\n  9\r\n$DIMCEN\r\n 40\r\n2.5\r\n  9\r\n$DIMTSZ\r\n 40\r\n0.0\r\n  9\r\n$DIMTOL\r\n 70\r\n     0\r\n  9\r\n$DIMLIM\r\n 70\r\n     0\r\n  9\r\n$DIMTIH\r\n 70\r\n     0\r\n  9\r\n$DIMTOH\r\n 70\r\n     0\r\n  9\r\n$DIMSE1\r\n 70\r\n     0\r\n  9\r\n$DIMSE2\r\n 70\r\n     0\r\n  9\r\n$DIMTAD\r\n 70\r\n     1\r\n  9\r\n$DIMZIN\r\n 70\r\n     8\r\n  9\r\n$DIMBLK\r\n  1\r\n\r\n  9\r\n$DIMASO\r\n 70\r\n     1\r\n  9\r\n$DIMSHO\r\n 70\r\n     1\r\n  9\r\n$DIMPOST\r\n  1\r\n\r\n  9\r\n$DIMAPOST\r\n  1\r\n\r\n  9\r\n$DIMALT\r\n 70\r\n     0\r\n  9\r\n$DIMALTD\r\n 70\r\n     3\r\n  9\r\n$DIMALTF\r\n 40\r\n0.03937007874016\r\n  9\r\n$DIMLFAC\r\n 40\r\n1.0\r\n  9\r\n$DIMTOFL\r\n 70\r\n     1\r\n  9\r\n$DIMTVP\r\n 40\r\n0.0\r\n  9\r\n$DIMTIX\r\n 70\r\n     0\r\n  9\r\n$DIMSOXD\r\n 70\r\n     0\r\n  9\r\n$DIMSAH\r\n 70\r\n     0\r\n  9\r\n$DIMBLK1\r\n  1\r\n\r\n  9\r\n$DIMBLK2\r\n  1\r\n\r\n  9\r\n$DIMSTYLE\r\n  2\r\nISO-25\r\n  9\r\n$DIMCLRD\r\n 70\r\n     0\r\n  9\r\n$DIMCLRE\r\n 70\r\n     0\r\n  9\r\n$DIMCLRT\r\n 70\r\n     0\r\n  9\r\n$DIMTFAC\r\n 40\r\n1.0\r\n  9\r\n$DIMGAP\r\n 40\r\n0.625\r\n  9\r\n$LUNITS\r\n 70\r\n     2\r\n  9\r\n$LUPREC\r\n 70\r\n     4\r\n  9\r\n$SKETCHINC\r\n 40\r\n1.0\r\n  9\r\n$FILLETRAD\r\n 40\r\n0.0\r\n  9\r\n$AUNITS\r\n 70\r\n     0\r\n  9\r\n$AUPREC\r\n 70\r\n     0\r\n  9\r\n$MENU\r\n  1\r\n.\r\n  9\r\n$ELEVATION\r\n 40\r\n0.0\r\n  9\r\n$PELEVATION\r\n 40\r\n0.0\r\n  9\r\n$THICKNESS\r\n 40\r\n0.0\r\n  9\r\n$LIMCHECK\r\n 70\r\n     0\r\n  9\r\n$BLIPMODE\r\n 70\r\n     0\r\n  9\r\n$CHAMFERA\r\n 40\r\n0.0\r\n  9\r\n$CHAMFERB\r\n 40\r\n0.0\r\n  9\r\n$SKPOLY\r\n 70\r\n     0\r\n  9\r\n$TDCREATE\r\n 40\r\n2457338.3996086\r\n  9\r\n$TDUPDATE\r\n 40\r\n2457338.400949283\r\n  9\r\n$TDINDWG\r\n 40\r\n0.0013450694\r\n  9\r\n$TDUSRTIMER\r\n 40\r\n0.0013450231\r\n  9\r\n$USRTIMER\r\n 70\r\n     1\r\n  9\r\n$ANGBASE\r\n 50\r\n0.0\r\n  9\r\n$ANGDIR\r\n 70\r\n     0\r\n  9\r\n$PDMODE\r\n 70\r\n     0\r\n  9\r\n$PDSIZE\r\n 40\r\n0.0\r\n  9\r\n$PLINEWID\r\n 40\r\n0.0\r\n  9\r\n$COORDS\r\n 70\r\n     1\r\n  9\r\n$SPLFRAME\r\n 70\r\n     0\r\n  9\r\n$SPLINETYPE\r\n 70\r\n     6\r\n  9\r\n$SPLINESEGS\r\n 70\r\n     8\r\n  9\r\n$ATTDIA\r\n 70\r\n     1\r\n  9\r\n$ATTREQ\r\n 70\r\n     1\r\n  9\r\n$HANDLING\r\n 70\r\n     1\r\n  9\r\n$HANDSEED\r\n  5\r\n'
                + currentHandle + '\r\n  9\r\n$SURFTAB1\r\n 70\r\n     6\r\n  9\r\n$SURFTAB2\r\n 70\r\n     6\r\n  9\r\n$SURFTYPE\r\n 70\r\n     6\r\n  9\r\n$SURFU\r\n 70\r\n     6\r\n  9\r\n$SURFV\r\n 70\r\n     6\r\n  9\r\n$UCSNAME\r\n  2\r\n\r\n  9\r\n$UCSORG\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$UCSXDIR\r\n 10\r\n1.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$UCSYDIR\r\n 10\r\n0.0\r\n 20\r\n1.0\r\n 30\r\n0.0\r\n  9\r\n$PUCSNAME\r\n  2\r\n\r\n  9\r\n$PUCSORG\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$PUCSXDIR\r\n 10\r\n1.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$PUCSYDIR\r\n 10\r\n0.0\r\n 20\r\n1.0\r\n 30\r\n0.0\r\n  9\r\n$USERI1\r\n 70\r\n     0\r\n  9\r\n$USERI2\r\n 70\r\n     0\r\n  9\r\n$USERI3\r\n 70\r\n     0\r\n  9\r\n$USERI4\r\n 70\r\n     0\r\n  9\r\n$USERI5\r\n 70\r\n     0\r\n  9\r\n$USERR1\r\n 40\r\n0.0\r\n  9\r\n$USERR2\r\n 40\r\n0.0\r\n  9\r\n$USERR3\r\n 40\r\n0.0\r\n  9\r\n$USERR4\r\n 40\r\n0.0\r\n  9\r\n$USERR5\r\n 40\r\n0.0\r\n  9\r\n$WORLDVIEW\r\n 70\r\n     1\r\n  9\r\n$SHADEDGE\r\n 70\r\n     3\r\n  9\r\n$SHADEDIF\r\n 70\r\n    70\r\n  9\r\n$TILEMODE\r\n 70\r\n     1\r\n  9\r\n$MAXACTVP\r\n 70\r\n    64\r\n  9\r\n$PLIMCHECK\r\n 70\r\n     0\r\n  9\r\n$PEXTMIN\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$PEXTMAX\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  9\r\n$PLIMMIN\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n  9\r\n$PLIMMAX\r\n 10\r\n12.0\r\n 20\r\n9.0\r\n  9\r\n$UNITMODE\r\n 70\r\n     0\r\n  9\r\n$VISRETAIN\r\n 70\r\n     1\r\n  9\r\n$PLINEGEN\r\n 70\r\n     0\r\n  9\r\n$PSLTSCALE\r\n 70\r\n     1\r\n  0\r\nENDSEC\r\n';

        return h;
    };

    //drawing tables - default strings, to make it customiable: remove one and write it to its own function e.g. layers
    var tables = function () {
        var begin = '  0\r\nSECTION\r\n  2\r\nTABLES\r\n';
        var vport = '  0\r\nTABLE\r\n  2\r\nVPORT\r\n 70\r\n     1\r\n  0\r\nVPORT\r\n  2\r\n*ACTIVE\r\n 70\r\n     0\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 11\r\n1.0\r\n 21\r\n1.0\r\n 12\r\n2489.7025447562319\r\n 22\r\n233.3782371705947\r\n 13\r\n0.0\r\n 23\r\n0.0\r\n 14\r\n10.0\r\n 24\r\n10.0\r\n 15\r\n10.0\r\n 25\r\n10.0\r\n 16\r\n0.0\r\n 26\r\n0.0\r\n 36\r\n1.0\r\n 17\r\n0.0\r\n 27\r\n0.0\r\n 37\r\n0.0\r\n 40\r\n6614.0\r\n 41\r\n2.9\r\n 42\r\n50.0\r\n 43\r\n0.0\r\n 44\r\n0.0\r\n 50\r\n0.0\r\n 51\r\n0.0\r\n 71\r\n     0\r\n 72\r\n  1000\r\n 73\r\n     1\r\n 74\r\n     3\r\n 75\r\n     0\r\n 76\r\n     0\r\n 77\r\n     0\r\n 78\r\n     0\r\n  0\r\nENDTAB\r\n';
        var ltypes = '  0\r\nTABLE\r\n  2\r\nLTYPE\r\n 70\r\n     1\r\n  0\r\nLTYPE\r\n  2\r\nCONTINUOUS\r\n 70\r\n     0\r\n  3\r\nSolid line\r\n 72\r\n    65\r\n 73\r\n     0\r\n 40\r\n0.0\r\n  0\r\nENDTAB\r\n';
        var styles = '  0\r\nTABLE\r\n  2\r\nSTYLE\r\n 70\r\n     2\r\n  0\r\nSTYLE\r\n  2\r\nSTANDARD\r\n 70\r\n     0\r\n 40\r\n0.0\r\n 41\r\n1.0\r\n 50\r\n0.0\r\n 71\r\n     0\r\n 42\r\n2.5\r\n  3\r\ntxt\r\n  4\r\n\r\n  0\r\nSTYLE\r\n  2\r\nANNOTATIVE\r\n 70\r\n     0\r\n 40\r\n0.0\r\n 41\r\n1.0\r\n 50\r\n0.0\r\n 71\r\n     0\r\n 42\r\n2.5\r\n  3\r\ntxt\r\n  4\r\n\r\n  0\r\nENDTAB\r\n';
        var view = '  0\r\nTABLE\r\n  2\r\nVIEW\r\n 70\r\n     0\r\n  0\r\nENDTAB\r\n';
        var ucs = '  0\r\nTABLE\r\n  2\r\nUCS\r\n 70\r\n     0\r\n  0\r\nENDTAB\r\n';
        var appid = '  0\r\nTABLE\r\n  2\r\nAPPID\r\n 70\r\n     8\r\n  0\r\nAPPID\r\n  2\r\nACAD\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACAD_PSEXT\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACADANNOPO\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACADANNOTATIVE\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACAD_DSTYLE_DIMJAG\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACAD_DSTYLE_DIMTALN\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACAD_MLEADERVER\r\n 70\r\n     0\r\n  0\r\nAPPID\r\n  2\r\nACAD_NAV_VCDISPLAY\r\n 70\r\n     0\r\n  0\r\nENDTAB\r\n';
        var dimstyle = '  0\r\nTABLE\r\n  2\r\nDIMSTYLE\r\n 70\r\n     3\r\n  0\r\nDIMSTYLE\r\n  2\r\nSTANDARD\r\n 70\r\n     0\r\n  3\r\n\r\n  4\r\n\r\n  5\r\n\r\n  6\r\n\r\n  7\r\n\r\n 40\r\n1.0\r\n 41\r\n0.18\r\n 42\r\n0.0625\r\n 43\r\n0.38\r\n 44\r\n0.18\r\n 45\r\n0.0\r\n 46\r\n0.0\r\n 47\r\n0.0\r\n 48\r\n0.0\r\n140\r\n0.18\r\n141\r\n0.09\r\n142\r\n0.0\r\n143\r\n25.399999999999999\r\n144\r\n1.0\r\n145\r\n0.0\r\n146\r\n1.0\r\n147\r\n0.09\r\n 71\r\n     0\r\n 72\r\n     0\r\n 73\r\n     1\r\n 74\r\n     1\r\n 75\r\n     0\r\n 76\r\n     0\r\n 77\r\n     0\r\n 78\r\n     0\r\n170\r\n     0\r\n171\r\n     2\r\n172\r\n     0\r\n173\r\n     0\r\n174\r\n     0\r\n175\r\n     0\r\n176\r\n     0\r\n177\r\n     0\r\n178\r\n     0\r\n  0\r\nDIMSTYLE\r\n  2\r\nANNOTATIVE\r\n 70\r\n     0\r\n  3\r\n\r\n  4\r\n\r\n  5\r\n\r\n  6\r\n\r\n  7\r\n\r\n 40\r\n0.0\r\n 41\r\n2.5\r\n 42\r\n0.625\r\n 43\r\n3.75\r\n 44\r\n1.25\r\n 45\r\n0.0\r\n 46\r\n0.0\r\n 47\r\n0.0\r\n 48\r\n0.0\r\n140\r\n2.5\r\n141\r\n2.5\r\n142\r\n0.0\r\n143\r\n0.03937007874016\r\n144\r\n1.0\r\n145\r\n0.0\r\n146\r\n1.0\r\n147\r\n0.625\r\n 71\r\n     0\r\n 72\r\n     0\r\n 73\r\n     0\r\n 74\r\n     0\r\n 75\r\n     0\r\n 76\r\n     0\r\n 77\r\n     1\r\n 78\r\n     8\r\n170\r\n     0\r\n171\r\n     3\r\n172\r\n     1\r\n173\r\n     0\r\n174\r\n     0\r\n175\r\n     0\r\n176\r\n     0\r\n177\r\n     0\r\n178\r\n     0\r\n  0\r\nDIMSTYLE\r\n  2\r\nISO-25\r\n 70\r\n     0\r\n  3\r\n\r\n  4\r\n\r\n  5\r\n\r\n  6\r\n\r\n  7\r\n\r\n 40\r\n1.0\r\n 41\r\n2.5\r\n 42\r\n0.625\r\n 43\r\n3.75\r\n 44\r\n1.25\r\n 45\r\n0.0\r\n 46\r\n0.0\r\n 47\r\n0.0\r\n 48\r\n0.0\r\n140\r\n2.5\r\n141\r\n2.5\r\n142\r\n0.0\r\n143\r\n0.03937007874016\r\n144\r\n1.0\r\n145\r\n0.0\r\n146\r\n1.0\r\n147\r\n0.625\r\n 71\r\n     0\r\n 72\r\n     0\r\n 73\r\n     0\r\n 74\r\n     0\r\n 75\r\n     0\r\n 76\r\n     0\r\n 77\r\n     1\r\n 78\r\n     8\r\n170\r\n     0\r\n171\r\n     3\r\n172\r\n     1\r\n173\r\n     0\r\n174\r\n     0\r\n175\r\n     0\r\n176\r\n     0\r\n177\r\n     0\r\n178\r\n     0\r\n  0\r\nENDTAB\r\n';
        var block = '  0\r\nENDSEC\r\n  0\r\nSECTION\r\n  2\r\nBLOCKS\r\n  0\r\nBLOCK\r\n  8\r\n0\r\n  2\r\n$MODEL_SPACE\r\n 70\r\n     0\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  3\r\n$MODEL_SPACE\r\n  1\r\n\r\n  0\r\nENDBLK\r\n  5\r\n21\r\n  8\r\n0\r\n  0\r\nBLOCK\r\n 67\r\n     1\r\n  8\r\n0\r\n  2\r\n$PAPER_SPACE\r\n 70\r\n     0\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n  3\r\n$PAPER_SPACE\r\n  1\r\n\r\n  0\r\nENDBLK\r\n  5\r\nD5\r\n 67\r\n     1\r\n  8\r\n0\r\n  0\r\nENDSEC\r\n';

        return {
            begin: begin,
            vport: vport,
            ltypes: ltypes,
            styles: styles,
            view: view,
            ucs: ucs,
            appid: appid,
            dimstyle: dimstyle,
            block: block
        }
    };

    //define layers in drawing, example layersArray = [{name: '0', color: '7', ltype: 'CONTINUOUS' }, {name: 'Hatch', color: '7', ltype: 'CONTINUOUS' }]
    var layers = function (layersArray) {
            
        var begin = '  0\r\nTABLE\r\n  2\r\nLAYER\r\n 70\r\n     1\r\n  0\r\n';
        var end = '  0\r\nENDTAB\r\n';
        var layerTxt = '';

        // if layers are not defined by user then just declare default 0 layer
        var defaultLayer = {
            name : '0',
            color : '7',
            ltype : 'CONTINUOUS'
        };

        layersArray = layersArray || defaultLayer;

        // compose table of layers 
        for (var i = 0; i < layersArray.length; i++) {
            var str = 'LAYER\r\n  2\r\n' + layersArray[i].name + '\r\n 70\r\n     0\r\n 62\r\n     ' + layersArray[i].color + '\r\n  6\r\n' + layersArray[i].ltype + '\r\n'
            layerTxt = layerTxt + str;
        };
            
        layerTxt = begin + layerTxt + end;

        return layerTxt;
    }

    //create polyline vertices, usage: var pline1 = jsDXF.lwpolyline([{ x: 0, y: 0 }, { x: 555, y: 555 }], 5, 0);
    var lwpolyline = function (pointsArray, width, layer) {

        //if layer and width not define use default values
        width = width || '5';
        layer = layer || '0';

        //pointsArray should be in format like: var pointsArray = [{ x: 0, y: 0 }, { x: 555, y: 555 }]
        var vertexStrings = '';
        var startHandle = handle().toString(16).toUpperCase();
        
        for (var i = 0; i < pointsArray.length; i++) {
            var vertexHandle = handle().toString(16).toUpperCase();
            var str = '  0\r\nVERTEX\r\n  5\r\n' + vertexHandle + '\r\n  8\r\n' + layer + '\r\n 10\r\n' + pointsArray[i].x + '\r\n 20\r\n' + pointsArray[i].y + '\r\n 30\r\n0.0\r\n'
            vertexStrings = vertexStrings + str;
        };

        var endHandle = handle().toString(16).toUpperCase();

        var DXF_plineEntity = '  0\r\nPOLYLINE\r\n  5\r\n' + startHandle + '\r\n  8\r\n' + layer + '\r\n 66\r\n     1\r\n 10\r\n0.0\r\n 20\r\n0.0\r\n 30\r\n0.0\r\n 70\r\n     1\r\n 40\r\n' + width + '\r\n 41\r\n' + width + '\r\n' + vertexStrings + '  0\r\nSEQEND\r\n  5\r\n' + handle().toString(16).toUpperCase() + '\r\n  8\r\n0\r\n';

        return DXF_plineEntity;
    };

    //composer adds all file parts to make one file string, sequence is important
    var compose = function (header, layersTable, pline) {

        //end of file string
        var eof = '  0\r\nENDSEC\r\n  0\r\nEOF\r\n';

        //if layers not given use default values
        layersTable = layersTable || layers();
        header = header || header();

        var fparts = [];

        fparts[0] = header;
        fparts[1] = tables.begin;
        fparts[2] = tables.vport;
        fparts[3] = tables.linetypes;
        fparts[4] = layersTable;
        fparts[5] = tables.styles;
        fparts[6] = tables.view;
        fparts[7] = tables.ucs;
        fparts[8] = tables.appid;
        fparts[9] = tables.dimstyle;
        fparts[10] = tables.block;
        fparts[11] = pline;

        return fparts.join() + eof;
    }

    return {
        lwpolyline: lwpolyline,
        layers: layers,
        line: line,
        compose: compose
    }
})()
