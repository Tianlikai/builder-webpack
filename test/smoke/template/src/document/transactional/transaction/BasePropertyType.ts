export enum BasePropertyType {
    Unknown = 'unknown',

    Boolean = 'boolean',
    Integer = 'integer',
    Number = 'number',
    NumberArray = 'NumberArray',

    String = 'string',
    StringArray = 'StringArray',
    StringArrayArray = 'StringArrayArray',

    ElementId = 'ElementId',
    GRep = 'GRep',
    BRepArray = 'BRepArray',
    BRep = 'BRep',
    ElementIdArray = 'ElementIdArray',

    Matrix3 = 'Matrix3',
    Matrix4 = 'Matrix4',
    Point3d = 'Point3d',
    Point2d = 'Point2d',
    Vector3d = 'Vector3d',
    Vector2d = 'Vector2d',
    Plane = 'Plane',
    GeomFace2d = 'GeomFace2d',

    TransactionalObject = 'TransactionalObject',
    TransactionalSet = 'TransactionalSet',

    LocationCurve = 'LocationCurve',
    LocationCurve3d = 'LocationCurve3d',
    LocationPoint = 'LocationPoint',
    LocationPoint3d = 'LocationPoint3d',
    CompositeCurve3d = 'CompositeCurve3d',
    CompositeCurve2d = 'CompositeCurve2d',
    // TODO: toDelete
    Profile = 'Profile',
    ControlJoins = 'ControlJoins',
    JoinInfoArray = 'JoinInfoArray',
    CleanUpTag = 'CleanUpTag'
}
